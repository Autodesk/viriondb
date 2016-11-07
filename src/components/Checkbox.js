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
