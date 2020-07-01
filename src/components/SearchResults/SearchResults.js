import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import ArtistProfile from '../ArtistProfile/ArtistProfile'
import Albums from '../Albums/Albums'

class SearchResults extends React.Component {

    renderSearchResults(){
 
        if(this.props.searchResults){
            return (
                <div className="Results">
                    <div className="SearchResults">
                    <ArtistProfile artistProfile={this.props.artistProfile}/>
                    <div className="SongsAlbums">
                        <div className="Songs">
                            <h2>Songs</h2>
                            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
                        </div>
                        
                        <div className="Albums">
                            <h2>Albums</h2>
                            <Albums albums={this.props.searchAlbums}/>
                        </div>
                    </div>
                    
                    
                </div>
                </div>
                
            )
        }
    }
    render(){
        return (
            <div >
                {this.renderSearchResults()}
            </div>
        )
    }
}
export default SearchResults;