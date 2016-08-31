import React, { Component, PropTypes } from 'react';
import { filters } from '../constants/filters';

import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import LineGraph from './charts/LineGraph';

export default class BrowseChart extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
  };

  static componentMap = {
    discrete: PieChart,
    range: LineGraph,
    //whatMakesItALineInsteadOfABar: LineGraph,
  };

  render() {
    const { field } = this.props;
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
