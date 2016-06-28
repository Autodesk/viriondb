import React, {Component} from 'react';
import { Link } from 'react-router';

import '../styles/Header.css';

export default class Header extends Component {
  render() {
    return (
        <div className="Header">
          <Link className="Header-home"
                to="/">Virion DB</Link>
        </div>
    );
  }
};
