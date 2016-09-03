import React, { Component, PropTypes } from 'react';

import '../styles/Checkbox.css';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  onClick = (evt) => {
    evt.preventDefault();
    const { checked, disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    if (!onChange) {
      return;
    }
    onChange(!checked);
  };

  render() {
    const { color, checked, disabled } = this.props;
    return (
      <div className={'Checkbox' +
      (checked ? ' checked' : '') +
      (disabled ? ' disabled' : '')}
           style={{backgroundColor: ((checked && color) ? color : null)}}
           onClick={(evt) => this.onClick(evt)}/>
    );
  }
};
