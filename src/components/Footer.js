import React, { Component } from 'react';

import '../styles/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-autodesk"/>
        <div className="Footer-right">
          <div className="Footer-links">
            <a className="Footer-link"
               target="_blank"
               href="https://forum.bionano.autodesk.com/t/about-viriondb/">About VirionDB</a>
            <a className="Footer-link"
               target="_blank">Community</a>
            <a className="Footer-link"
               target="_blank"
               href="https://forum.bionano.autodesk.com/t/feedback/127">Feedback</a>
            <a className="Footer-link"
               target="_blank"
               href="http://bionano.autodesk.com/">More Bio Nano Tools</a>
          </div>
          <div className="Footer-logo"/>
        </div>
      </div>
    );
  }
}
