import React from 'react';
import './Albums.css';


class Albums extends React.Component {

    renderAlbums(){
        if(this.props.albums){

            return Object.keys(this.props.albums).map(key => {
                return (
                    <div key={key} className="album">
                        <img src={this.props.albums[key].images[0].url} alt=""></img>
                        <div className="albumDetails">
                            <h3>{this.props.albums[key].albumname}</h3>
                            <p>{this.props.albums[key].artistname}</p>
                        </div>
                    </div>
                )
            })
        }
        
    }
    render(){
        return (
            <div className="Albums">
                {this.renderAlbums()}
            </div>
        )
    }
}
export default Albums;