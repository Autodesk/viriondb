import React, { Component, PropTypes } from 'react';
import { rows } from '../constants/rows';

import '../styles/RefineControl.css';

export default class RefineControl extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired,
    name: PropTypes.oneOf(rows).isRequired,
    filter: PropTypes.any,
  };

  static defaultProps = {};

  render() {
    const { name, filter } = this.props;
    return (
      <div className="RefineControl">
        todo
      </div>
    );
  }
}
