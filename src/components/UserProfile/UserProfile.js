import React from 'react';
import './UserProfile.css'

class UserProfile extends React.Component {

    renderUserProfile(){
        if(this.props.currentUser){
            return (
                <div className="UserProfile">
                    <img src={this.props.currentUser.images[0].url}  alt=""></img>
                    <p>{this.props.currentUser.display_name}</p>
                </div>
            )
        }
    }
    render(){
        return( 
            <div >
                {this.renderUserProfile()}
            </div>
        )
    }
}

export default UserProfile;
