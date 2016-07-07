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
	}

	state = {
		activeTag: -1,
	};

  onInputKeyDown = (evt) => {
    if (evt.which !== 13) {
      return;
    }
    evt.preventDefault();
    this.props.addInputTag(evt.target.value); 
    this.props.setSearchInput('');
  };

  onInputChange = (evt) => {
    this.props.setSearchInput(evt.target.value);
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
        							         isActive={this.state.activeTag === index} />
             );
        	})}
        </div>
         {/* need to wrap in form for submit to work */}
        <input type="text"
               value={this.props.searchInput}
               onChange={this.onInputChange}
               onKeyDown={this.onInputKeyDown}
        	     placeholder="Add Search Terms"/>
      </div>
    );
  }
};
