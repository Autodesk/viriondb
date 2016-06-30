import React, { Component, PropTypes } from 'react';
import { rows } from '../constants/rows';

import Capsid3d from './rowDetail/Capsid3d';

export default class ComparisonRowDetail extends Component {
  static propTypes = {
    field: PropTypes.oneOf(rows).isRequired,
    value: PropTypes.any,
    instance: PropTypes.object.isRequired,
  };

  static componentMap = {
    capsid_morphology: Capsid3d,
  }

  render() {
    const { field, value, instance } = this.props;
    const DetailComponent = ComparisonRowDetail.componentMap[field];

    if (!DetailComponent) {
      return null;
    }
    
    return (<DetailComponent {...this.props} />);
  }
}
