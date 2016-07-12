import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';

import '../styles/BrowseTableHeaderColumn.css';

export default class BrowseTableHeaderColumn extends Component {
  static propTypes = {
    checked: PropTypes.object.isRequired,
    instances: PropTypes.array.isRequired,
    hovered: PropTypes.string,
    onHover: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    onCompare: PropTypes.func.isRequired,
    sections: PropTypes.object.isRequired,
    onToggleSection: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const { hovered, checked, onHover, onOpen, onCheck, onCompare, instances, sections, onToggleSection } = this.props;

    return (
      <div className="BrowseTableSection">
        <div className="BrowseTableHeaderColumn">
          <div className="BrowseTableSection-heading">
            {Object.keys(sections).map(section => {
              return (
                <a onClick={() => onToggleSection(section)}
                   className={'BrowseTableHeaderColumn-dot' + (sections[section] ? ' active' : '')}
                   alt={section}
                   key={section}>•</a>
              );
            })}
          </div>

          <div className="BrowseTableSection-title">
            <a className="action action-dark"
               onClick={() => onCompare()}>Compare</a>
          </div>

          <div className="BrowseTableSection-values">
            {instances.map(instanceId => {
              const isChecked = checked[instanceId];
              const isHovered = hovered === instanceId;
              return (
                <div className={'BrowseTableSection-cell' +
                                (isHovered ? ' hovered' : '') +
                                (isChecked ? ' checked' : '')}
                     onMouseEnter={() => onHover(instanceId)}
                     key={instanceId}>
                  <a className={'BrowseTableHeaderColumn-open action action-black' + (isHovered ? '' : ' invisible')}
                     onClick={() => onOpen(instanceId)}>
                    Open
                  </a>
                  <Checkbox key={instanceId}
                            onChange={(evt) => onCheck(instanceId)}
                            checked={isChecked}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
