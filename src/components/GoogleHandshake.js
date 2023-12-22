import { useEffect } from "react";
// import axios from 'axios';
// import google from 'google-auth-library'
// import { gapi } from 'gapi-script'
//   // const formID = '1ZfjTO-ljFZ9nraX4jZx9_EPJwppxogS67EeuiHE_vmg'
//   // Discovery doc URL for APIs used by the quickstart
//   // const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
//   // Authorization scopes required by the API; multiple scopes can be
//   // included, separated by spaces.
//   // const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

const DISCOVERY_DOC = 'https://forms.googleapis.com/$discovery/rest?version=v1'
const CLIENT_ID = '924990453973-8gphvq8jl2n8298usfip89j89phb72gv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDi_nt9WpDRo1eyNd5-xruGjzR0uHKYg6c';
const SCOPE = 'https://www.googleapis.com/auth/forms';
var tokenClient
function GoogleHandshake() {

    useEffect(() => {
        // const SCOPE = SCOPES;
        async function initializeGapiClient() {
            await window.gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
        }
        const script = document.createElement('script');
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;
        script.onload = window.gapi.load('client', initializeGapiClient)
        document.body.appendChild(script);
        return () => {
            console.log('gapi is work');
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPE,
                callback: '', // defined later
            });
        }
        document.body.appendChild(script);
        return () => {
            <button id="authorize_button" onClick={handleAuthClick}> Authorize
            </button>
            console.log('tokenClient');
            document.body.removeChild(script);
        };


    }, [])
}
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        console.log('222');

    };

}


// function 
export default GoogleHandshake;
