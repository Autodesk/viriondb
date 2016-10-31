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
import { rowSizes } from '../constants/rows';
import { mark } from '../data/performance';
import registry from '../data/register';
import Checkbox from './Checkbox';

import '../styles/BrowseTableValue.css';

export default class BrowseTableValue extends Component {
  static propTypes = {
    instanceId: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
  };

  componentWillReceiveProps() {
    mark(`value ${this.props.instanceId} - receive props`);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.instanceId !== nextProps.instanceId ||
      this.props.sections.length !== nextProps.sections.length ||
      this.props.checked !== nextProps.checked;
  }

  componentDidUpdate() {
    mark(`value ${this.props.instanceId} - updated`);
  }

  render() {
    mark(`value ${this.props.instanceId} - rendering`);

    const { instanceId, sections, checked, onOpen, onCheck } = this.props;
    const instance = registry[instanceId];
    const defaultValue = '\u00a0'; //unknownValue;

    return (
      <div className={'BrowseTableValue' + (checked ? ' checked' : '')}>

        <div className="BrowseTableSection">
          <div className="BrowseTableValue-cell">
            <a className="BrowseTableValue-open action action-black"
               onClick={() => onOpen(instanceId)}>
              Open
            </a>
            <Checkbox key={instanceId}
                      onChange={(evt) => onCheck(instanceId)}
                      checked={checked}/>
          </div>
        </div>

        {sections.map(section => {
          const { name, fields } = section;
          return (
            <div className="BrowseTableSection"
                 key={name}>
              {fields.map(field => {
                return (
                  <div className="BrowseTableValue-cell"
                       style={{ width: rowSizes[field] }}
                       title={instance[field]}
                       key={field}>
                    {instance[field] || defaultValue}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
