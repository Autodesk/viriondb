import React, { Component, PropTypes } from 'react';
import { rowHierarchy } from '../constants/rows';

import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

//todo - ensure selected items are in the filtered list

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    openInstances: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  state = {
    checked: { 'M14008.1': true, 'AC_000004.1': true },
    sections: rowHierarchy.map(section => section.name).reduce((acc, name) => Object.assign(acc, { [name]: true }), {}),
    hovered: null,
    tableHeight: 500,
  };

  handleScroll = (evt) => {
    evt.persist();
    console.log(evt);
    //todo

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
    const { hovered, checked, sections, tableHeight } = this.state;
    const offset = 0;
    const fudge = 4;
    const length = Math.floor((tableHeight / (2 * 16))) + (fudge * 2);
    const start = Math.max(0, offset - fudge);
    const end = Math.min(instances.length, start + length + fudge);
    const tableInstances = instances.slice(start, end);

    return (
      <div className="BrowseTable"
           style={{maxHeight: `${tableHeight}px`}}
           onMouseLeave={(evt) => this.setHovered(null)}
           onMouseEnter={(evt) => this.setHovered(null)}>
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>

        <div className="BrowseTable-values"
             onScroll={this.handleScroll}
             onMouseEnter={(evt) => evt.stopPropagation()}>
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
    );
  }
};
