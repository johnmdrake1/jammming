import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar/SearchBar';
import Track from './components/Track/Track';
import SearchResults from './components/SearchResults/SearchResults';
import Tracklist from './components/Tracklist/Tracklist';
import Playlist from './components/Playlist/Playlist';
import React, {useState} from 'react';

//mock search result tracks, to be passed down to searchresults component, then to tracklist component
const mocksearchresults = [
  { id:1, name: "Search track 1", artist: "Artist 1", album: "Album 1"},
  { id:2, name: "Search track 2", artist: "Artist 2", album: "Album 2"},
  { id:1, name: "Search track 3", artist: "Artist 3", album: "Album 3"},
  { id:1, name: "Search track 4", artist: "Artist 4", album: "Album 4"}
]

//Mock playlist tracks, to be passed down to playlist component, then to tracklist component
const mockplaylist = [
  { id:1, name: "Playlist track 1", artist: "Artist 1", album: "Album 1"},
  { id:2, name: "Playlist track 2", artist: "Artist 2", album: "Album 2"},
  { id:1, name: "Playlist track 3", artist: "Artist 3", album: "Album 3"},
  { id:1, name: "Playlist track 4", artist: "Artist 4", album: "Album 4"}
]

function App() {

  //Playlist name state
  const [playlistname, setPlaylistName] = useState("New Playlist");


  return (
    <div>
      <Container>
        {/* App Title */}
        <Row>
          <Col>
            <h1 className="text-success text-center">JAMMMMMMMMING</h1>
          </Col>
        </Row>
        {/* Search Bar */}
        <Row>
          <Col>
            <SearchBar />
          </Col>
        </Row>
        {/* Search Results and Playlist components with mock data */}
        <Row>
          {/* Search Results */}
          <Col md={6}>
            <SearchResults tracks={mocksearchresults} />
          </Col>
          {/* Playlist */}
          <Col md={6}>
            <Playlist playlistname={playlistname} tracks={mockplaylist} setPlaylistName={setPlaylistName} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
