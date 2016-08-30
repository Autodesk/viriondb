import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import SearchBar from './SearchBar';

import '../styles/Header.css';

export default class Header extends Component {
  static propTypes = {
    showSearch: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className="Header">
        <div className="Header-nav">
          <Link className="Header-home" to="/"/>
        </div>
        {this.props.showSearch && (<SearchBar />)}
        <div className="Header-icons">
          {this.props.showSearch && (<div className={'Header-icon Header-lens'}
                                          onClick={this.onClickLens}></div>)}
          <div className="Header-icon Header-share"
               onClick={this.onClickShare}></div>
          <div className="Header-icon Header-feedback"
               onClick={this.onClickFeedback}></div>
        </div>
      </div>
    );
  }
}
