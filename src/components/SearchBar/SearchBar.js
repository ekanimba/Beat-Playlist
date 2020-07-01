import React from 'react';
import './SearchBar.css';
import UserProfile from '../UserProfile/UserProfile';
import iconSearch from './icon_search.svg'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(this.state.term){
                this.search();
            }
        }
    }

    search() {
        this.props.onSearch(this.state.term);
    }
    handleTermChange(event) {
        this.setState({
            term : event.target.value
        });
    }
    render(){
        return (
            <div className="SearchBar">
                <div className="SearchMenu-options">
                    
                </div>
                <div className="Search-tracks">
                    <img src={iconSearch} alt=''></img>
                    <input onKeyDown={this._handleKeyDown} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                </div>
                <UserProfile currentUser={this.props.currentUser}/>
            </div>
        )
    }
}
export default SearchBar;

/*
    <button className="SearchButton"  onClick={this.search}>SEARCH</button>
    <ul>DISCOVER</ul>
    <ul>MY LIBRARY</ul>
*/