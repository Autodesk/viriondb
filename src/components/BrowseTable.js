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
import { rowHierarchy, fieldName, rowSizes, headerColumnWidth } from '../constants/rows';
import { throttle } from 'lodash';

import BrowseTableHeaders from './BrowseTableHeaders';
import BrowseTableValues from './BrowseTableValues';

import '../styles/BrowseTable.css';
import '../styles/BrowseTableSection.css';

const initialSections = rowHierarchy.map(section => section.name).reduce((acc, name) => Object.assign(acc, { [name]: true }), {});

//todo - scroll to top on filter change
//todo - dynamic table height - should be drag-handle resizable
//todo - ensure selected items are in the filtered list

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    openInstances: PropTypes.func.isRequired,
  };

  state = {
    checked: {},
    activeSections: initialSections,
  };

  toggleChecked = (id) => {
    const isChecked = this.state.checked[id];
    const next = Object.assign({}, this.state.checked);
    if (isChecked) {
      delete next[id];
    } else {
      next[id] = true;
    }

    this.setState({
      checked: next,
    });
  };

  toggleSection = (sectionKey) => {
    const nextSections = Object.assign({}, this.state.activeSections, { [sectionKey]: !this.state.activeSections[sectionKey] });

    this.setState({
      activeSections: nextSections,
    });
  };

  openInstances = (...ids) => {
    const toOpen = ids.length > 0 ? ids : Object.keys(this.state.checked);
    this.props.openInstances(...toOpen);
  };

  render() {
    const { instances } = this.props;
    const { checked, activeSections } = this.state;

    const activeSectionObjects = rowHierarchy.filter(section => activeSections[section.name]);

    const totalWidth = activeSectionObjects.reduce((acc, section) => {
      //1 is border
      return acc + 1 + section.fields.reduce((acc, field) => acc + rowSizes[field], 0);
    }, headerColumnWidth + 1);

    return (
      <div className="BrowseTable">
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>

        <div className="BrowseTable-content">
          <BrowseTableHeaders totalWidth={totalWidth}
                              toggleSection={this.toggleSection}
                              sections={activeSectionObjects}
                              openInstances={this.openInstances}/>

          <BrowseTableValues instances={instances}
                             sections={activeSectionObjects}
                             checkInstance={this.toggleChecked}
                             checked={checked}
                             openInstances={this.openInstances}
                             totalWidth={totalWidth}/>
        </div>
      </div>
    );
  }
};
