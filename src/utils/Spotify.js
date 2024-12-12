//access token value
let accessToken;
//client id from .env file or Netlify environment
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//redirect URL Spotify will redirect to after authentification
//Spotify will include the access token in this URL if authentification is successful
//IMPORTANT CHANGE: Commenting out this, replacing with window.location.origin to make this redirectUri dynamic based on the environment(netlify or localhost, etc.)
// const redirectUri = 'http://localhost:3000/';
const redirectUri = window.location.origin + '/';


//spotify object with functions for working with the API
const Spotify = {
    //Function for getting spotify access token
    getAccessToken() {
        //check if the token is already stored in the accesToken variable, return it if so
        if (accessToken){
            return accessToken;
        }

        //extract token and expiration time from the URL using regex
        //for holding the extraction of the token itself
        const tokenmatch = window.location.href.match(/access_token=([^&]*)/);
        //for holding the extraction of the expiration time match
        const expirationmatch = window.location.href.match(/expires_in=([^&]*)/);

        //if these values are successfully set
        if (tokenmatch && expirationmatch){
            //store the token(the [1] refers to the captured value in the regex group(([^&]*)).)
            accessToken = tokenmatch[1];
            //store the expiration time in seconds, convert the extracted expires_in value to a number
            const expiresin = Number(expirationmatch[1]);

            //use window.setTimeout to clear the token after it expires(in seconds, converted to milliseconds)
            window.setTimeout(() => (accessToken = ""), expiresin * 1000)

            //rewrite the url without reloading the page to remove sensitive data
            window.history.pushState("Access Token", null, '/');

            //return the access token
            return accessToken;
        }

        //redirect to Spotify login/authorization page if no access token is found, so user can login and grant app permission.
        //base url, Spotify's authorization endpoint
        let accessurl = "https://accounts.spotify.com/authorize"
        //response type, needs to be token(implicit grant flow)
        accessurl += "?response_type=token";
        //this app's client id from Spotify
        accessurl += `&client_id=${clientId}`;
        //scope required, which is play-list-modify-public. This scope allows modification of public playlists.
        accessurl += "&scope=playlist-modify-public";
        //Where to redirect back to after login
        accessurl += `&redirect_uri=${redirectUri}`;

        //Do the actual redirect to the login/authorization page
        window.location = accessurl;
    },
    //Search function! Accesses API to return track object results
    search(term) {
        //retrieve the access token using the getAccessToken function defined above
        const accessToken = Spotify.getAccessToken();
        //Construct the search API endpoint for tracks
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

        //fetch call itself with track search endpoint
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}` //Attach the access token in the request header
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`Failed to fetch search results: ${response.statusText}`); //handle api errors
            }
            return response.json(); //parse the JSON response(convert raw response data into a JavaScript object for easier use)
        })
        .then((jsonResponse) => {
            if (!jsonResponse.tracks) {
                return []; //If no tracks are found, just return an empty array
            }
            return jsonResponse.tracks.items.map((track) => ({
                id: track.id, //the spotify id for the track, which is the base-62 identifier found at the end of the Spotify URI
                name: track.name, //the name of the track
                artist: track.artists[0].name, //access the first artist's name like this, becaue of how the artists data is structured
                album: track.album.name, //the album on which the track appears
                // genre: track.genres[0], //whatever the first of the listed genres is
                uri: track.uri //unique spotify specific identifier for the track
            }))
        })
    },

    //Function for adding playlist with songs and custom name
    savePlaylist(playlistname, trackuris){
        //check for playlist name and track uris array
        if(!playlistname || !trackuris.length){
            //exit early if no name or tracks provided, this prevents sending invalid requests
            return;
        }
        //get access token using getAccessToken function as above
        const accessToken = Spotify.getAccessToken();
        //endpoint for accessing the user's id
        const endpoint = "https://api.spotify.com/v1/me"
        //for storing the user's id
        let userId;
        //fetch the user's ID
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user ID: ${response.statusText}`);
            }
            return response.json();
        })
        .then((jsonResponse) => {
            //get the user's id for later use
            userId = jsonResponse.id; //Parses the JSON response and saves the user's id for later use
            console.log("User ID has been fetched with ID:", userId);
            console.log("Playlist name to be created:", playlistname);
            //Now, create a new playlist
            //Construct the API endpoint for creating a playlist, this uses the user's id retrieved above
            const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

            //Define the body of the POST request, stringify it to get it ready to send to the server
            const body = JSON.stringify({
                name: playlistname, //the given name for the new playlist
                description: 'This playlist was created with the Jammming app!' //(optional) description for the playlist
                //public:false could go here, but I believe public defaults to true, and that this is an optional value, so I'm going to leave the 'public' value out unless it causes problems.
                //I'd like playlists to be made public, maybe change this later.
            });

            //Make the POST request to create the playlist
            return fetch(createPlaylistEndpoint, {
                method: 'POST', //since we're CREATING the playlist, this is a POST request
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json' //This specifies that we're sending JSON data in the request body
                },
                body: body //Attach the JSON body with the playlist details. Passes the JSON stringified data as the payload for the request.
            });
        })
        .then((response) => {
            //When the playlist is successfully created, Spotify returns a response with the Playlist ID. We need this ID to add tracks to the playlist
            //Check if the request was successful. If not; throw an error
            if (!response.ok){
                throw new Error(`Failed to create playlist: ${response.statusText}`);
            }
            return response.json(); //Parse the response as JSON, convert the raw response data into a JavaScript object
        })
        .then((jsonResponse) =>{
            //Finally, add tracks to the new playlist
            const playlistId = jsonResponse.id //Extract the playlist id from the response that was sent when spotify created the playlist
            console.log("New Playlist created with ID: ", playlistId);

            console.log("Track URIs to be added to playlist ",playlistId," : ", trackuris);

            //Construct the endpoint for adding tracks to the playlist
            const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

            //Define the body of the POST request
            const body = JSON.stringify({
                uris: trackuris //Array of track URIs to add
            });

            //Make the POST request to add tracks
            return fetch(addTracksEndpoint, {
                method: "POST", //POST because we're adding tracks
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json" //Specify JSON content type
                },
                body: body //Attach the JSON body with track URIs
            });
        })
        .then((response) => {
            //Handle the response from adding tracks and log success or errors:
            if (!response.ok) {
                throw new Error(`Failed to add tracks to playlist: ${response.statusText}`); //check if request was successful, if not throw error
            }
            console.log("Tracks added to playlist successfully!"); //confirm tracks were added to the playlist
        })
        .catch((error) => {
            //Handles any errors that occur during the process and logs them.
            console.error("Error saving playlist:", error);
        });
    }
}

export default Spotify;