import React from 'react';
import './ArtistProfile.css';


class ArtistProfile extends React.Component {

    renderArtistProfile(){
        if(this.props.artistProfile){
            return (
                <div>
                    <img src={this.props.artistProfile.artist.url} alt=''></img>
                    <p>{this.props.artistProfile.name}</p>
                </div>
            )
        }
    }
    render(){
        
        return (
            <div className="ArtistProfile">
                {this.renderArtistProfile()}
            </div>
        )
    }
}
export default ArtistProfile;