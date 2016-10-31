/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { Component, PropTypes } from 'react';
import { filters } from '../constants/filters';
import { isEqual } from 'lodash';

import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import LineGraph from './charts/LineGraph';

export default class BrowseChart extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  static componentMap = {
    discrete: PieChart,
    range: LineGraph,
    //whatMakesItALineInsteadOfABar: LineGraph,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field || !isEqual(this.props.data, nextProps.data);
  }

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
