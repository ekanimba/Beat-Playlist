import React from 'react';
//import icons_music from './icons_music.svg'
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      playlistcollapsible: {display: 'none'}
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.playlistcollapsible = this.playlistcollapsible.bind(this)
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
    this.setState({playlistName: event.target.value})
    
  }
  playlistcollapsible(){

    if(this.state.playlistcollapsible.display === 'none'){
      this.setState({playlistcollapsible: {display: 'block'}})
    }else {
      this.setState({playlistcollapsible: {display: 'none'}})
    }
  }
  render() {
    return (
      <div className="Playlist">
        
        <div className="CreatePlaylistContent" style={this.state.playlistcollapsible}>
          <input onChange={this.handleNameChange} defaultValue={this.state.playlistName} />
          <TrackList tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove} />
          <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        <button  type="button" className="CreatePlaylistcollapsible" onClick={this.playlistcollapsible}><img alt="" />
          {this.state.playlistName}
        </button>
      </div>
    );
  }
}

export default Playlist;