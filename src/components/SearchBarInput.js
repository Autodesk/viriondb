import React, { Component } from 'react';

import '../styles/SearchBarInput.css';

export default class SearchBarInput extends Component {
  render() {
    return (
      <div className="SearchBarInput">
        <div className="SearchBarInput-tags"></div>
        <input type="text" />
      </div>
    );
  }
};
