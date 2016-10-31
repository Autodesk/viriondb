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

export default class LineageTree extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    if (!this.props.value) {
      return null;
    }

    const tax = this.props.value.split(': ');
    /*
     .replace('[', '')
     .replace(']', '')
     .trim()
     .replace(/\'/gi, '')
     .split(', ');
     */

    return null;

    /*
    return (
      <div className="LineageTree">
        <ul>
          {tax.map(level => (<li>{level}</li>)) }
        </ul>
      </div>
    );
    */
  }
};
