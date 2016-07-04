import React, { Component } from 'react';

import '../styles/SearchBarInputTag.css';

export default class SearchBarInputTag extends Component {

  static propTypes = {
    tag: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  render() {
    const { tag, isActive } = this.props;

    return (
      <div className={'SearchBarInputTag' + (isActive ? ' active' : '')}>
        <div className="SearchBarInputTag-text">{tag.text}</div>
        <div className="SearchBarInputTag-close">x</div>
      </div>
    );
  }
};
