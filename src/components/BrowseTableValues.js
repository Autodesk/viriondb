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
import { tableRowHeight } from '../constants/layout';
import { throttle } from 'lodash';
import { mark } from '../data/performance';
import { onFilterChange } from '../data/activeFilters';

import BrowseTableValue from './BrowseTableValue';

export default class BrowseTableValues extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    checkInstance: PropTypes.func.isRequired,
    openInstances: PropTypes.func.isRequired,
    totalWidth: PropTypes.number.isRequired,
    checked: PropTypes.object.isRequired,
  };

  state = {
    offset: 0,
    tableHeight: 400,
  };

  componentDidMount() {
    this.listener = onFilterChange((function scrollTopOnFilterChange() {
      this.setState({ offset: 0 });
      this.tableValues.scrollTop = 0;
    }).bind(this));
  }

  componentWillReceiveProps() {
    mark('table - receive props');
  }

  componentDidUpdate() {
    mark('table - update done');
  }

  componentWillUnmount() {
    this.listener();
  }

  handleScroll = (evt) => {
    //evt.persist();
    //console.log(evt);
    //console.log(this.tableValues.scrollTop, Math.floor(this.tableValues.scrollTop / tableRowHeight));

    this.setState({
      offset: Math.floor(this.tableValues.scrollTop / tableRowHeight),
    });
  };

  render() {
    mark('table - render start');

    const { sections, checked, instances, totalWidth, openInstances, checkInstance } = this.props;
    const { tableHeight, offset } = this.state;

    const fudge = 3;
    const numberDisplay = Math.floor((tableHeight / (tableRowHeight))) + (fudge * 2);
    const countStart = Math.max(0, offset - fudge);
    const countEnd = Math.min(this.props.instances.length, countStart + numberDisplay + (fudge * 2));
    const tableInstances = this.props.instances.slice(countStart, countEnd);

    return (
      <div className="BrowseTable-valuesWrap"
           ref={(el) => {
             if (el) {
               this.tableValues = el;
             }
           }}
           style={{
             width: totalWidth + 'px',
             maxHeight: `${tableHeight}px`,
           }}
           onScroll={this.handleScroll}
           onMouseEnter={(evt) => evt.stopPropagation()}>
        <div className="BrowseTable-values"
             style={{
               paddingTop: (countStart * tableRowHeight) + 'px',
               paddingBottom: ((instances.length - countEnd) * tableRowHeight) + 'px',
               height: `${instances.length * tableRowHeight}px`,
             }}>
          {tableInstances.map((instanceId, index) => {
            return (
              <BrowseTableValue instanceId={instanceId}
                                key={index}
                                sections={sections}
                                onOpen={openInstances}
                                onCheck={checkInstance}
                                checked={checked[instanceId] === true}/>
            );
          })}
        </div>
      </div>
    );
  }
}