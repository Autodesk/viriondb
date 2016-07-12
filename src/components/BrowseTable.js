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
    tableHeight: 800,
  };

  setHovered = (id) => {
    this.setState({ hovered: id });
  };

  toggleChecked = (id) => {
    //ideally, delete from object but whatever
    this.setState({
      checked: Object.assign({}, this.state.checked, { [id]: !this.state.checked[id] }),
    });
  };

  onToggleSection = (section) => {
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
    const tableInstances = instances.slice(0, 50);
    const { hovered, checked, sections, tableHeight } = this.state;

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
             onMouseEnter={(evt) => evt.stopPropagation()}>
          <BrowseTableHeaderColumn checked={checked}
                                   hovered={hovered}
                                   sections={sections}
                                   onToggleSection={this.onToggleSection}
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
