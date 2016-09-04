import React, { Component, PropTypes } from 'react';
import { rowSizes, headerColumnWidth } from '../constants/rows';
import registry from '../data/register';
import Checkbox from './Checkbox';

import '../styles/BrowseTableValue.css';

export default class BrowseTableSection extends Component {
  static propTypes = {
    instanceId: PropTypes.string.isRequired,
    sections: PropTypes.array.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
  };

  render() {
    const { instanceId, sections, checked, onOpen, onCheck } = this.props;
    const instance = registry[instanceId];
    const defaultValue = '\u00a0'; //unknownValue;

    return (
      <div className={'BrowseTableValue' + (checked ? ' checked' : '')}>

        <div className="BrowseTableValue-section">
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
            <div className="BrowseTableValue-section"
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
