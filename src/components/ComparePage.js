import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import registry, { onRegister } from '../data/register';
import { rows } from '../constants/rows';
import { star } from '../data/favorites';

import ComparisonRow from './ComparisonRow';
import ComparisonActions from './ComparisonActions';

import '../styles/ComparePage.css';

export class ComparePage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.shape({
      instances: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.listener = onRegister((registry, length) => {
      if (length > 0) {
        this.forceUpdate();
      }
    });
  }

  state = {
    activeRow: null,
  };

  onClickRow = (row) => {
    this.setState({ activeRow: row });
  };

  onStar = (id) => {
    star(id);
    this.forceUpdate();
  };

  onRemove = (id) => {
    const ids = this.props.params.instances.split(',');
    const index = ids.indexOf(id);
    if (index >= 0) {
      ids.splice(index, 1);
    }
    this.props.router.replace(`/${ids.join(',')}`);
  };

  render() {
    const instances = this.props.params.instances
      .split(',')
      .map(instanceId => registry[instanceId])
      .filter(instance => !!instance);

    return (
      <div className="ComparePage">
        <div className="ComparePage-table">
          <ComparisonActions instances={instances}
                             onStar={this.onStar}
                             onRemove={(id) => this.onRemove(id)}/>
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

export default withRouter(ComparePage);

