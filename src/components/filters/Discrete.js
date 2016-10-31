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
import Checkbox from '../Checkbox';
import { toggleDiscreteFilter } from '../../data/activeFilters';

import '../../styles/Discrete.css';

export default class Discrete extends Component {
  static propTypes = {
    filter: PropTypes.object,
    field: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    defaultFilter: PropTypes.any.isRequired,
  };

  render() {
    const { values, field, filter } = this.props;
    return (
      <div className="Discrete">
        {Object.keys(values).map(value => {
          const name = values[value];
          const checked = !!filter && filter[value];
          return (
            <div className="Discrete-option"
                 onClick={(evt) => toggleDiscreteFilter(field, value)}
                 key={value}>
              <Checkbox className="Discrete-checkbox"
                        checked={checked}/>
              <span className="Discrete-text">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
