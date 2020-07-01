
//let accessToken = 'brwQxtyNB8QezWGo1Lw6p3MZxBhyKJ7tL8T7VhBA2QoCAyurKhmCxvaOMGuEtkcP39_uZSdKu3dVcJGRpHdlLzYSl2VEZIOp8SYb_rKfSejCFGSnMF1d41ZKh-4u1-tV4oI7gKMQtERmHBgGG9kThvl56Oj9R-ajCLVJ6ilEw';
const clientId = '82eaac3465024011ada89dc1c8c8ca33';
const redirectUri= 'http://localhost:3000/'
const authEndpoint = 'https://accounts.spotify.com/authorize';

let accessToken;

const  Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  getCurrentUser(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse;
    })
  },
  searchTrack(term, accessToken){
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        images: track.album.images[0]
      }));
    });
  },
  searchArtists(term, accessToken){
    return fetch(`https://api.spotify.com/v1/search?type=artist&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.artists) {
        return [];
      }
      return jsonResponse.artists.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        artist: artist.images[0],
        uri: artist.uri
      }));
    });
  },
  searchArtistAlbum(artist, accessToken){
    return fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.items) {
        return [];
      }
      return jsonResponse.items.map(album => ({
        id: album.id,
        albumname: album.name,
        artistname: album.artists[0].name,
        images: album.images,
        release_date: album.release_date
      }));
    });
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    let search = [];
    let artist = '';
    return Spotify.searchTrack(term, accessToken).then(searchTracks => {
      search.push({searchTracks: searchTracks});
      return search;
    }).then((search) => {
      return Spotify.searchArtists(term, accessToken).then(searchArtists => {
        artist = searchArtists[0];
        search.push({searchArtists: searchArtists})
        return search;
      }).then(search =>{

        return Spotify.searchArtistAlbum(artist, accessToken).then(albums => {
          
          search.push({ albums: Spotify.getUnique(albums, 'albumname') })
          search.push({ artist: artist})

          return search;
        })
      })
    });
  },
  getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;

/*
Pressing enter triggers a search
Include preview samples for each track
Only display songs not currently present in the playlist in the search results
Add a loading screen while playlist is saving
Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
After user redirect on login, restoring the search term from before the redirect
Ensure playlist information doesn’t get cleared if a user has to refresh their access token
Provide a way to fetch and see all your existing playlists
#a7ff83
#17b978
#086972
#071a52
 */
