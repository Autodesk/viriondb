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
import { fieldName, rowSizes, setRowSize } from '../constants/rows';
import registry, { onRegister } from '../data/register';

import '../styles/BrowseTableSection.css';

export default class BrowseTableSection extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    instances: PropTypes.array.isRequired,
    onHover: PropTypes.func.isRequired,
    checked: PropTypes.object.isRequired,
    hovered: PropTypes.string,
  };

  static defaultProps = {};

  componentDidMount() {
    this.listener = onRegister((registry, length) => { if (length > 0) { this.forceUpdate(); } });
  }

  componentWillUnmount() {
    this.listener();
  }

  //todo - componentize
  render() {
    const { name, fields, instances, onHover, hovered, checked } = this.props;
    const defaultValue = '\u00a0'; //unknownValue;

    return (
      <div className="BrowseTableSection">
        <div className="BrowseTableSection-heading">
          {name}
        </div>

        {fields.map(field => {
          const nameField = fieldName(field);
          return (
            <div className="BrowseTableSection-column"
                 style={{width: rowSizes[field]}}
                 key={field}>
              <div className="BrowseTableSection-title">{nameField}</div>

              <div className="BrowseTableSection-values">
                {instances.map(instanceId => {
                  const isChecked = checked[instanceId];
                  const isHovered = hovered === instanceId;
                  return (
                    <div className={'BrowseTableSection-cell' +
                                   (isHovered ? ' hovered' : '') +
                                   (isChecked ? ' checked' : '')}
                         title={registry[instanceId][field]}
                         onMouseEnter={() => onHover(instanceId)}
                         key={instanceId}>
                      {registry[instanceId][field] || defaultValue}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
