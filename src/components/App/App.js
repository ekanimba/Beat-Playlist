import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Library from '../Library/Library'


Spotify.getAccessToken();

export default class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      searchResults: null,
      playlistName: 'New Playlist',
      playlistTracks: [],
      currentUser: null,
      searchArtist: null,
      searchAlbums: null
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.artist = {
      name: "Rihanna",
      url: "https://i.scdn.co/image/1fc2f537d678d701d7d143a8fd4f0c2f29fbde22"
    }
    
  }
  componentDidMount(){
    this.currentUser()
  }

  currentUser() {
    Spotify.getCurrentUser().then(user => {
      this.setState({currentUser: user})
    })
  }
  search(term) {
    Spotify.search(term).then(search=> {
      this.setState({
        searchResults: search[0].searchTracks,
        searchArtist: search[3].artist,
        searchAlbums: search[2].albums
      });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {

    const trackUris = this.state.playlistTracks.map(track => track.uri);
    if(trackUris){
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
    }
  }

  render() {
    
    return (
      <div className="AppBackground">
        <div className="App">
          <div className="Menu">
            <Library />
          </div>
          <div className="Content">
            <SearchBar onSearch={this.search} currentUser={this.state.currentUser}/>
            <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
                           artistProfile={this.state.searchArtist}
                           searchAlbums={this.state.searchAlbums}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onNameChange={this.updatePlaylistName}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist} />
          </div>
          </div>
        </div>

        <div className="Player"></div>
      </div>
    );
  }
};

/**
 * 
 * 
 */