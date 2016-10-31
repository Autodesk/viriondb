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
import { mark } from '../data/performance';

import BrowseChart from './BrowseChart';

import '../styles/BrowseCharts.css';

export default class BrowseCharts extends Component {
  static propTypes = {
    noInstances: PropTypes.bool.isRequired,
    derivedData: PropTypes.object.isRequired,
  };

  componentWillReceiveProps() {
    mark('charts - receive props');
  }

  componentDidUpdate() {
    mark('charts - update done');
  }

  render() {
    mark('charts - render start');
    const { noInstances, derivedData } = this.props;

    return (
      <div className="BrowseCharts">
        <div className="BrowseCharts-heading">Explore Viral Metadata</div>

        <div className="BrowseCharts-content">
          {noInstances && <div className="BrowseCharts-empty">No Data</div>}
          {!noInstances && Object.keys(derivedData).map(field => (
            <BrowseChart key={field}
                         field={field}
                         data={derivedData[field]}/>
          ))}
        </div>
      </div>
    );
  }
};
