import React, { Component } from 'react';

import SearchBarInput from './SearchBarInput';

import '../styles/SearchBar.css';

export default class SearchBar extends Component {

  state = {
    active: false,
    tags: [], //todo - move to app state
  };

  onClickLens = (evt) => {
    this.setState({ active: true });
  };

  onClickClose = (evt) => {
    this.setState({ active: false });
  };

  render() {
    const { active } = this.state;

    return (
      <div className={'SearchBar' + (active ? '' : ' closed')}>
        <div className="SearchBar-text">Search</div>

        <SearchBarInput tags={this.state.tags} />

        <div className="SearchBar-lens"
             onClick={this.onClickLens}>{`\u2315`}</div>
        <div className="SearchBar-close"
             onClick={this.onClickClose}>X</div>
      </div>
    );
  }
};
