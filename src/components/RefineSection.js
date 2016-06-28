import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';
import RefineControl from './RefineControl';

import '../styles/RefineSection.css';

export default class RefineSection extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.any,
    name: PropTypes.string.isRequired,
  };

  resetFilter = () => {
    this.props.setFilter({ [this.props.name]: null });
  };

  render() {
    const { name, filter, setFilter } = this.props;

    const isActive = !!filter;

    return (
      <div className={'RefineSection' + (isActive ? ' active' : '')}>
        <div className="RefineSection-heading">
          {fieldName(name)}
        </div>

        <div className="RefineSection-reset"
             onClick={() => this.resetFilter()}>
          Reset
        </div>

        <div className="RefineSection-control">
          <RefineControl name={name}
                         filter={filter}
                         setFilter={setFilter}/>
        </div>
      </div>
    );
  }
}
