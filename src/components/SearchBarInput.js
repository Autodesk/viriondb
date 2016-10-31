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
import React, { PropTypes, Component } from 'react';

import SearchBarInputTag from './SearchBarInputTag';

import '../styles/SearchBarInput.css';

export default class SearchBarInput extends Component {
  static propTypes = {
    searchInput: PropTypes.string.isRequired,
    setSearchInput: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    addInputTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    clearTags: PropTypes.func.isRequired,
  };

  state = {
    activeTag: -1,
  };

  onInputKeyDown = (evt) => {
    //enter
    if (evt.which === 13) {
      evt.preventDefault();
      this.props.addInputTag(evt.target.value);
      this.props.setSearchInput('');
    } else if (evt.keyCode === 27) {
      evt.preventDefault();
      this.onClickClear(evt);
    }
  };

  onInputChange = (evt) => {
    this.props.setSearchInput(evt.target.value);
  };

  onClickClear = (evt) => {
    this.props.clearTags();
  };

  render() {
    return (
      <div className="SearchBarInput">
        <div className="SearchBarInput-tags">
          {this.props.tags.map((tag, index) => {
            return (
              <SearchBarInputTag tag={tag}
                                 key={index}
                                 onRemove={() => this.props.removeTag(index)}
                                 isActive={this.state.activeTag === index}/>
            );
          })}
        </div>
        {/* need to wrap in form for submit to work */}
        <input type="text"
               value={this.props.searchInput}
               onChange={this.onInputChange}
               onKeyDown={this.onInputKeyDown}
               placeholder="Add Search Terms"/>
        {(this.props.tags.length > 0 || this.props.searchInput.length > 0) && (
          <div className="SearchBar-icon SearchBarInput-clear"
               onClick={this.onClickClear}></div>)}
      </div>
    );
  }
};
