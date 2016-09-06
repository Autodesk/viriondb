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
import { isEqual } from 'lodash';
import { rowHierarchy, fieldName, rowSizes } from '../constants/rows';

export default class BrowseTableHeaders extends Component {
  static propTypes = {
    totalWidth: PropTypes.number.isRequired,
    sections: PropTypes.array.isRequired,
    openInstances: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.sections.length !== nextProps.sections.length ||
      this.props.totalWidth !== nextProps.totalWidth;
  }

  render() {
    const { openInstances, toggleSection, totalWidth, sections } = this.props;

    return (
      <div className="BrowseTable-headers"
           style={{ width: totalWidth + 'px' }}>

        <div className="BrowseTableSection">
          <div className="BrowseTableHeaderColumn">
            <div className="BrowseTableSection-heading">
              {rowHierarchy.map(({ name, fields }) => {
                const active = sections.some(obj => obj.name === name);
                return (
                  <a onClick={() => toggleSection(name)}
                     className={'BrowseTableSection-headerDot' +
                     (active ? ' active' : '')}
                     alt={name}
                     key={name}>•</a>
                );
              })}
            </div>

            <div className="BrowseTableSection-columnName BrowseTableSection-compare">
              <a className="action action-dark"
                 onClick={() => openInstances()}>Compare</a>
            </div>
          </div>
        </div>

        {sections.map(section => {
          const { name, fields } = section;

          return (
            <div className="BrowseTableSection"
                 key={name}>
              <div className="BrowseTableSection-heading">
                {name}
              </div>
              <div className="BrowseTableSection-columns">
                {fields.map(field => {
                  const nameField = fieldName(field);
                  return (
                    <div className="BrowseTableSection-columnName"
                         style={{ width: rowSizes[field] }}
                         key={field}>{nameField}</div>
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
