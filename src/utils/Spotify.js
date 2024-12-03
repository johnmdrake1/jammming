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
    }
}

export default Spotify;