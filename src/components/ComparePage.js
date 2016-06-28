import React, {Component, PropTypes} from 'react';
import instanceMap from '../../data/testSet.js';
import {rows, rowNames} from '../constants/rows';

import ComparisonRow from './ComparisonRow';
import ComparisonActions from './ComparisonActions';

import '../styles/ComparePage.css';

export default class Instance extends Component {
  static propTypes = {
    params: PropTypes.shape({
      instances: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    activeRow: null
  };

  onClickRow = (row) => {
    this.setState({activeRow: row});
  };

  render() {
    const instances = this.props.params.instances
        .split(',')
        .map(instanceId => instanceMap[instanceId])
        .filter(instance => !!instance);

    return (
        <div className="ComparePage">
          <div className="ComparePage-table">
            <ComparisonActions instances={instances}/>
            {rows.map(row => (
                <ComparisonRow key={row}
                               row={row}
                               onClick={() => this.onClickRow(row)}
                               isActive={this.state.activeRow === row}
                               instances={instances}/>
            ))}
          </div>
        </div>
    );
  }
}
