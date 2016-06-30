import React, { Component, PropTypes } from 'react';
import { capitalize } from 'lodash';
import { rows, fieldName, rowNames } from '../constants/rows';

import ComparisonRowDetail from './ComparisonRowDetail';

import '../styles/ComparisonRow.css';

export default class ComparisonRow extends Component {
  static propTypes = {
    row: PropTypes.string.isRequired,
    instances: PropTypes.array.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
    onClick: () => {},
  };

  state = {
    activeRow: null,
  };

  render() {
    const { row, instances, isActive, onClick } = this.props;
    return (
      <div className={'ComparisonRow' + (isActive ? ' active' : '')}
           onClick={() => onClick(row)}>
        <div className="ComparisonRow-key">
          {fieldName(row)}
        </div>

        {instances.map(instance => {
          return (
            <div key={instance.id}
                 className="ComparisonRow-value">
              <div className="ComparisonRow-basic">{instance[row]}</div>
              {isActive && (<ComparisonRowDetail field={row}
                                                 instance={instance}
                                                 value={instance[row]}/>)}
            </div>
          );
        })}
      </div>
    );
  }
}
