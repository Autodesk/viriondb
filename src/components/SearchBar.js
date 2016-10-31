/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
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
    setFilter({ name: this.state.tags.concat(this.state.input).filter(term => !!term) });
  };

  onAddInputTag = (input) => {
    this.setState({
      tags: this.state.tags.concat(input),
    }, this.updateSearchFilter);
    this.setSearchInput('');
  };

  setSearchInput = (input) => {
    invariant(typeof input === 'string', 'input must be a string');

    this.setState({
      input,
    }, this.updateSearchFilter);
  };

  onRemoveTag = (index) => {
    const next = this.state.tags.slice();
    next.splice(index, 1);
    this.setState({
      tags: next,
    }, this.updateSearchFilter);
  };

  clearTags = () => {
    this.setState({
      input: '',
      tags: [],
    }, this.updateSearchFilter);
  };

  render() {
    const { active, input, tags } = this.state;

    return (
      <div className={'SearchBar' + (active ? '' : ' closed')}>
        <div className="SearchBar-text">Search</div>

        <SearchBarInput tags={tags}
                        searchInput={input}
                        clearTags={this.clearTags}
                        setSearchInput={(input) => this.setSearchInput(input)}
                        removeTag={(index) => this.onRemoveTag(index)}
                        addInputTag={(input) => this.onAddInputTag(input)}/>
      </div>
    );
  }
};
