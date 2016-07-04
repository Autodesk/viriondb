import React, {Component, PropTypes} from 'react';
import { filters } from '../constants/filters';

import PieChart from './PieChart';

export default class BrowseChart extends Component {
  static propTypes = {
  	instances: PropTypes.array.isRequired,
  	data: PropTypes.object.isRequired,
  };

  static componentMap = {
    discrete: PieChart,
  };

  render() {
    const { field, data } = this.props;
  	const type = filters[field].type;
    const ChartComponent = BrowseChart[type];

    return (
        <ChartComponent {...this.props}>
    );
  }
};
