import React, {Component} from 'react';
import { Link } from 'react-router';

import SearchBar from './SearchBar';

import '../styles/Header.css';

export default class Header extends Component {
  render() {
    return (
        <div className="Header">
          <div className="Header-nav">
            <Link className="Header-home"
                to="/">Virion DB</Link>
          </div>
          <SearchBar />
        </div>
    );
  }
};
