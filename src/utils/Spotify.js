//access token value
let accessToken;
//client id from .env file
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//redirect URL Spotify will redirect to after authentification
//Spotify will include the access token in this URL if authentification is successful
const redirectUri = 'http://localhost:3000/';


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
                genre: track.genres[0], //whatever the first of the listed genres is
                uri: track.uri //unique spotify specific identifier for the track
            }))
        })
    }
}

export default Spotify;