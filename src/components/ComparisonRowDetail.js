import React, { Component, PropTypes } from 'react';
import { rows } from '../constants/rows';

import Capsid3d from './rowDetail/Capsid3d';
import BaltimoreGroup from './rowDetail/BaltimoreGroup';
import Host from './rowDetail/Host';
import LineageTree from './rowDetail/LineageTree';

export default class ComparisonRowDetail extends Component {
  static propTypes = {
    field: PropTypes.oneOf(rows).isRequired,
    value: PropTypes.any,
    instance: PropTypes.object.isRequired,
  };

  static componentMap = {
    capsid_morphology: Capsid3d,
    derived_baltimore: BaltimoreGroup,
    host: Host,
    derived_lineage: LineageTree,
  };

  render() {
    const { field, value, instance } = this.props;
    const DetailComponent = ComparisonRowDetail.componentMap[field];

    if (!DetailComponent) {
      return null;
    }
    
    return (<DetailComponent {...this.props} />);
  }
}
