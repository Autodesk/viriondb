import React, { PropTypes, Component } from 'react';

import '../styles/SearchBarInputTag.css';

export default class SearchBarInputTag extends Component {
  static propTypes = {
    tag: PropTypes.shape({
      text: PropTypes.string.isRequired,
      source: PropTypes.string,
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  render() {
    const { tag, isActive, onRemove } = this.props;

    return (
      <div className={'SearchBarInputTag' + (isActive ? ' active' : '')}>
        <div className="SearchBarInputTag-text">{tag.text}</div>
        <div className="SearchBarInputTag-close" 
             onClick={() => onRemove()}>x</div>
      </div>
    );
  }
};
