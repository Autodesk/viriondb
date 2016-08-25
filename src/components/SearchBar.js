import React, { Component } from 'react';
import invariant from 'invariant';

import { setFilter } from '../data/activeFilters';
import SearchBarInput from './SearchBarInput';

import '../styles/SearchBar.css';

export default class SearchBar extends Component {

  state = {
    active: true,
    input: '',
    tags: [], //todo - move to app state
  };

  onClickLens = (evt) => {
    this.setState({ active: true });
  };

  onClickClose = (evt) => {
    this.setState({ active: false });
  };

  onClickShare = (evt) => {
    alert('todo');
  };

  onClickFeedback = (evt) => {
    alert('todo');
  };

  updateSearchFilter = () => {
    setFilter({ name: this.state.tags });
  };

  onAddInputTag = (input) => {
    this.setState({
      tags: this.state.tags.concat({
        text: input,
        source: 'search',
      }),
    }, this.updateSearchFilter);
    this.setSearchInput('');
  };

  setSearchInput = (input) => {
    invariant(typeof input === 'string', 'input must be a string');

    this.setState({
      input,
    });
  };

  onRemoveTag = (index) => {
    const next = this.state.tags.slice();
    next.splice(index, 1);
    this.setState({
      tags: next,
    }, this.updateSearchFilter);
  };

  render() {
    const { active, input, tags } = this.state;

    return (
      <div className={'SearchBar' + (active ? '' : ' closed')}>
        <div className="SearchBar-text">Search</div>

        <SearchBarInput tags={tags}
                        searchInput={input}
                        setSearchInput={(input) => this.setSearchInput(input)}
                        removeTag={(index) => this.onRemoveTag(index)}
                        addInputTag={(input) => this.onAddInputTag(input)}/>

        <div className={'SearchBar-icon SearchBar-lens'}
             onClick={this.onClickLens}></div>
        <div className="SearchBar-icon SearchBar-close"
             onClick={this.onClickClose}></div>
        <div className="SearchBar-icon SearchBar-share"
             onClick={this.onClickShare}></div>
        <div className="SearchBar-icon SearchBar-feedback"
             onClick={this.onClickFeedback}></div>
      </div>
    );
  }
};
