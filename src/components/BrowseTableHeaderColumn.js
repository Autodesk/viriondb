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
  };

  static defaultProps = {};

  render() {
    const { hovered, checked, onHover, onOpen, onCheck, onCompare, instances } = this.props;

    return (
      <div className="BrowseTableSection">
        <div className="BrowseTableHeaderColumn">
          <div className="BrowseTableSection-heading">
            • • • • •
          </div>

          <div className="BrowseTableSection-title">
            <a className="action action-dark"
               onClick={onCompare}>Compare</a>
          </div>

          <div className="BrowseTableSection-values">
            {instances.map(instance => {
              const isChecked = checked[instance.id];
              const isHovered = hovered === instance.id;
              return (
                <div className={'BrowseTableSection-cell' +
                                (isHovered ? ' hovered' : '') +
                                (isChecked ? ' checked' : '')}
                     onMouseEnter={() => onHover(instance.id)}
                     key={instance.id}>
                  <a className={'BrowseTableHeaderColumn-open action action-black' + (isHovered ? '' : ' invisible')}
                      onClick={() => onOpen(instance.id)}>
                    Open
                  </a>
                  <Checkbox key={instance.id}
                            onChange={(evt) => onCheck(instance.id)}
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
