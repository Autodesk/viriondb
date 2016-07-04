import React, { Component } from 'react';

import SearchBarInputTag from './SearchBarInputTag';

import '../styles/SearchBarInput.css';

export default class SearchBarInput extends Component {

	static propTypes = {
		tags: PropTypes.array.isRequired,
	}

	state = {
		activeTag: -1,
	};

  render() {
    return (
      <div className="SearchBarInput">
        <div className="SearchBarInput-tags">
        	{this.props.tags.map((tag, index) => {
        		<SearchBarInputTag tag={tag}
        							isActive={this.state.activeTag === index} />
        	})}
        </div>
        <input type="text" 
        	   placeholder="Add Search Terms"/>
      </div>
    );
  }
};
