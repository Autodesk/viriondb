import React, { Component, PropTypes } from 'react';
import { rowHierarchy } from '../constants/rows';
import { tableRowHeight } from '../constants/layout';

import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

const initialSections = rowHierarchy.map(section => section.name).reduce((acc, name) => Object.assign(acc, { [name]: true }), {});

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
    sections: initialSections,
    hovered: null,
    tableViewHeight: 500,
  };

  handleScroll = (evt) => {
    evt.persist();
    //console.log(evt);
    //console.log(this.tableValues.scrollTop, Math.floor(this.tableValues.scrollTop / tableRowHeight));

    this.setState({
      offset: Math.floor(this.tableValues.scrollTop / tableRowHeight),
    });
  };

  setHovered = (id) => {
    this.setState({ hovered: id });
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

  toggleSection = (section) => {
    const nextSections = Object.assign({}, this.state.sections, { [section]: !this.state.sections[section] });

    this.setState({
      sections: nextSections,
    });
  };

  openInstances = (...ids) => {
    const toOpen = ids.length > 0 ? ids : Object.keys(this.state.checked);
    this.props.openInstances(...toOpen);
  };

  render() {
    const { instances } = this.props;
    const { offset, hovered, checked, sections, tableViewHeight } = this.state;

    const fudge = 4;
    const numberInstances = Math.floor((tableViewHeight / (tableRowHeight))) + (fudge * 2);
    const start = Math.max(0, offset - fudge);
    const end = Math.min(instances.length, start + numberInstances + fudge);
    const tableInstances = instances.slice(start, end);

    return (
      <div className="BrowseTable"
           style={{ maxHeight: `${tableViewHeight}px` }}
           onMouseLeave={(evt) => this.setHovered(null)}
           onMouseEnter={(evt) => this.setHovered(null)}>
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>

        <div className="BrowseTable-values-wrap"
             ref={(el) => {
               if (el) {
                 this.tableValues = el;
               }
             }}
             style={{
               overflowY: 'scroll',
             }}
             onScroll={this.handleScroll}
             onMouseEnter={(evt) => evt.stopPropagation()}>
          <div className="BrowseTable-values"
               style={{
                 paddingTop: (start * tableRowHeight) + 'px',
                 paddingBottom: ((instances.length - end) * tableRowHeight) + 'px',
                 height: `${instances.length * tableRowHeight}px`,
               }}>
            <BrowseTableHeaderColumn checked={checked}
                                     hovered={hovered}
                                     sections={sections}
                                     onToggleSection={this.toggleSection}
                                     onHover={this.setHovered}
                                     onCheck={this.toggleChecked}
                                     onOpen={this.openInstances}
                                     onCompare={this.openInstances}
                                     instances={tableInstances}/>

            {rowHierarchy
              .filter(section => sections[section.name])
              .map(section => {
                const { name, fields } = section;
                return (<BrowseTableSection key={name}
                                            name={name}
                                            fields={fields}
                                            onHover={this.setHovered}
                                            hovered={hovered}
                                            checked={checked}
                                            instances={tableInstances}/>);
              })}
          </div>
        </div>
      </div>
    );
  }
};
