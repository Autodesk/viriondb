import React, {Component, PropTypes} from 'react';
import { filters } from '../constants/filters';

import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';

export default class BrowseChart extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
  	data: PropTypes.any.isRequired,
  };

  static componentMap = {
    discrete: PieChart,
    range: BarChart,
  };

  render() {
    const { field, data } = this.props;
  	const info = filters.find(filter => filter.field === field);
    const ChartComponent = BrowseChart.componentMap[info.type];

    if (!ChartComponent) {
      return null;
    }

    return (
        <ChartComponent {...this.props} {...info} />
    );
  }
};
