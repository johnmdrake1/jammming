import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from './components/SearchBar/SearchBar';
import Track from './components/Track/Track';
import SearchResults from './components/SearchResults/SearchResults';
import Tracklist from './components/Tracklist/Tracklist';
import Playlist from './components/Playlist/Playlist';
import React, {useState} from 'react';
import Spotify from './utils/Spotify';

//mock search result tracks, to be passed down to searchresults component, then to tracklist component
//Don't need anymore
// const mocksearchresults = [
//   { id:1, name: "Search track 1", artist: "Artist 1", album: "Album 1", genre: "Genre 1", uri:"spotify:track:1"},
//   { id:2, name: "Search track 2", artist: "Artist 2", album: "Album 2", genre: "Genre 2", uri:"spotify:track:2"},
//   { id:3, name: "Search track 3", artist: "Artist 3", album: "Album 3", genre: "Genre 3", uri:"spotify:track:3"},
//   { id:4, name: "Search track 4", artist: "Artist 4", album: "Album 4", genre: "Genre 4", uri:"spotify:track:4"}
// ];

//Mock playlist tracks, to be passed down to playlist component, then to tracklist component
// Don't need mock playlist tracks, just mock search results since add functionality was implemented.
// const mockplaylist = [
//   { id:1, name: "Playlist track 1", artist: "Artist 1", album: "Album 1"},
//   { id:2, name: "Playlist track 2", artist: "Artist 2", album: "Album 2"},
//   { id:1, name: "Playlist track 3", artist: "Artist 3", album: "Album 3"},
//   { id:1, name: "Playlist track 4", artist: "Artist 4", album: "Album 4"}
// ]

function App() {
  //experimenting with styling. To get back to how it was, comment out/remove this lock and remove style=backgroundStyle from the enclosing div.
  const backgroundStyle = {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Vibrant purle-blue gradient
    minHeight: '100vh', // Ensure it covers the full viewport
    padding: '20px', // Add some padding around the content
};
  //Playlist name state
  const [playlistname, setPlaylistName] = useState("New Playlist");
  //State for the playlist itself
  const [playlist, setPlaylist] = useState([]);
  //State for search results
  const [searchresults, setSearchResults] = useState([]);
  //function for handling adding tracks when the add track button is clicked
  function addTrack(track){
    //first check that the track is not already in the playlist. This is done by negating the result of a .find where the track in question is matched against every track.
    if (!playlist.find((playlistTrack) => playlistTrack.id === track.id)){
      //Make the playlist the current playlist plus the track to be added
      setPlaylist([...playlist, track]);
    }
  }

  //function for handling removing of tracks when the remove track button is clicked, similar to the addTrack function
  function removeTrack(track){
    //Use filter on playlist state to remove track with the matching id
    setPlaylist(playlist.filter((playlistTrack) => playlistTrack.id !== track.id));
  }

  //function for saving playlist, for now just with mock data
  function savePlaylist(){
    //map to extract the uri(uniform resource identifier) values from the playlist, save them to a new array called uris
    const uris = playlist.map((track) => track.uri);

    //simulate what will eventually be actually saving the playlist by logging the uri values
    // console.log("Saving playlist with name, ", playlistname, "uris:", uris);
    console.log("About to save playlist by calling savePlaylist in App.js, playlist and playlist name will be reset afterward...");
    Spotify.savePlaylist(playlistname, uris);

    //reset the playlist itself and playlist name to their default values since everything's done, so a new playlist can theoretically be made
    setPlaylist([]);
    setPlaylistName("New Playlist");
  }

  //test function for getting access token
  // function handleGetAccessToken(){
  //   const token = Spotify.getAccessToken();
  //   console.log("Access Token:", token);
  // }

  //doSearch function that will be called when a search is ready to be performed. Will be passed down as a prop to the SearchBar component
  function doSearch(term){
    //Spotify.search(term) will return a promise, which when resolved will return an array of track objects. Search results setter is called with this array.
    Spotify.search(term).then((results) => {
      console.log("Search Results:", results); //log the results of the search
      //set the reults using the state setter for search results
      setSearchResults(results);
    })
    .catch((error) => console.error("Search error:", error));
  }

  return (
    <div style={backgroundStyle}>
      <Container>
        {/* App Title */}
        <Row>
          <Col>
            <h1 className="text-success text-center">JAMMMMMMMMING</h1>
          </Col>
        </Row>
        {/* Test Button for getting access token, will need to be removed  */}
        {/* <Row>
          <Col>
            <Button onClick={handleGetAccessToken}>Test access token</Button>
          </Col>
        </Row> */}
        {/* Search Bar */}
        <Row>
          <Col>
            <SearchBar doSearch={doSearch}/>
          </Col>
        </Row>
        {/* Search Results and Playlist components with mock data */}
        <Row>
          {/* Search Results */}
          <Col md={6}>
            <SearchResults tracks={searchresults} action={addTrack} actionLabel="Add" />
          </Col>
          {/* Playlist */}
          <Col md={6}>
            <Playlist playlistname={playlistname} tracks={playlist} setPlaylistName={setPlaylistName} action={removeTrack} actionLabel="Remove" savePlaylist={savePlaylist}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
