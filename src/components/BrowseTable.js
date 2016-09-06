import React, { Component, PropTypes } from 'react';
import { rowHierarchy, fieldName, rowSizes, headerColumnWidth } from '../constants/rows';
import { tableRowHeight } from '../constants/layout';
import { throttle } from 'lodash';

import BrowseTableHeaders from './BrowseTableHeaders';
import BrowseTableValue from './BrowseTableValue';

import '../styles/BrowseTable.css';
import '../styles/BrowseTableSection.css';

const initialSections = rowHierarchy.map(section => section.name).reduce((acc, name) => Object.assign(acc, { [name]: true }), {});

//todo - scroll to top on filter change
//todo - dynamic table height
//todo - ensure selected items are in the filtered list

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    openInstances: PropTypes.func.isRequired,
  };

  state = {
    offset: 0,
    checked: {},
    activeSections: initialSections,
    tableViewHeight: 400,
  };

  handleScroll = (evt) => {
    //evt.persist();
    //console.log(evt);
    //console.log(this.tableValues.scrollTop, Math.floor(this.tableValues.scrollTop / tableRowHeight));

    this.setState({
      offset: Math.floor(this.tableValues.scrollTop / tableRowHeight),
    });
  };

  handleScrollDebounced = throttle(this.handleScroll, 25);

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
    const { offset, checked, activeSections, tableViewHeight } = this.state;

    const activeSectionObjects = rowHierarchy.filter(section => activeSections[section.name]);

    const totalWidth = activeSectionObjects.reduce((acc, section) => {
      //1 is border
      return acc + 1 + section.fields.reduce((acc, field) => acc + rowSizes[field], 0);
    }, headerColumnWidth + 1);

    const fudge = 4;
    const numberDisplay = Math.floor((tableViewHeight / (tableRowHeight))) + (fudge * 2);
    const start = Math.max(0, offset - fudge);
    const end = Math.min(instances.length, start + numberDisplay + (fudge * 2));
    const tableInstances = instances.slice(start, end);

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
                              openInstances={this.openInstances} />

          <div className="BrowseTable-valuesWrap"
               ref={(el) => {
                 if (el) {
                   this.tableValues = el;
                 }
               }}
               style={{
                 width: totalWidth + 'px',
                 maxHeight: `${tableViewHeight}px`,
               }}
               onScroll={this.handleScrollDebounced}
               onMouseEnter={(evt) => evt.stopPropagation()}>
            <div className="BrowseTable-values"
                 style={{
                   paddingTop: (start * tableRowHeight) + 'px',
                   paddingBottom: ((instances.length - end) * tableRowHeight) + 'px',
                   height: `${instances.length * tableRowHeight}px`,
                 }}>
              {tableInstances.map((instanceId) => {
                return (
                  <BrowseTableValue instanceId={instanceId}
                                    key={instanceId}
                                    sections={activeSectionObjects}
                                    onOpen={this.openInstances}
                                    onCheck={this.toggleChecked}
                                    checked={checked[instanceId] === true}/>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
