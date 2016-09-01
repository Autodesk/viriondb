import React, { Component } from 'react';

import '../styles/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-autodesk"/>
        <div className="Footer-right">
          <div className="Footer-links">
            <a className="Footer-link">About VirionDB</a>
            <a className="Footer-link">FAQ</a>
            <a className="Footer-link">Community</a>
            <a className="Footer-link">Feedback</a>
            <a className="Footer-link">Support</a>
            <a className="Footer-link">More Bio Nano Tools</a>
          </div>
          <div className="Footer-logo"/>
        </div>
      </div>
    );
  }
};
