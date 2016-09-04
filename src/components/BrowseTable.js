import React, { Component, PropTypes } from 'react';
import { rowHierarchy, fieldName, rowSizes, headerColumnWidth } from '../constants/rows';
import { tableRowHeight } from '../constants/layout';

import BrowseTableValue from './BrowseTableValue';
import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

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
    sections: initialSections,
    hovered: null,
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
    const { offset, checked, sections, tableViewHeight } = this.state;

    const activeSections = rowHierarchy.filter(section => sections[section.name]);

    const totalWidth = activeSections.reduce((acc, section) => {
      //1 is border
      return acc + 1 + section.fields.reduce((acc, field) => acc + rowSizes[field], 0);
    }, headerColumnWidth + 1);

    const fudge = 4;
    const numberInstances = Math.floor((tableViewHeight / (tableRowHeight))) + (fudge * 2);
    const start = Math.max(0, offset - fudge);
    const end = Math.min(instances.length, start + numberInstances + fudge);
    const tableInstances = instances.slice(start, end);

    return (
      <div className="BrowseTable"
           onMouseLeave={(evt) => this.setHovered(null)}
           onMouseEnter={(evt) => this.setHovered(null)}>
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>

        <div className="BrowseTable-content">
          <div className="BrowseTable-headers"
               style={{ width: totalWidth + 'px' }}>

            <div className="BrowseTableSection">
              <div className="BrowseTableHeaderColumn">
                <div className="BrowseTableSection-heading">
                  {Object.keys(sections).map(section => {
                    return (
                      <a onClick={() => this.toggleSection(section)}
                         className={'BrowseTableHeaderColumn-dot' + (sections[section] ? ' active' : '')}
                         alt={section}
                         key={section}>•</a>
                    );
                  })}
                </div>

                <div className="BrowseTableSection-title">
                  <a className="action action-dark"
                     onClick={() => this.openInstances()}>Compare</a>
                </div>
              </div>
            </div>

            {activeSections.map(section => {
              const { name, fields } = section;
              return (
                <div className="BrowseTableSection"
                     key={name}>
                  <div className="BrowseTableSection-heading">
                    {name}
                  </div>
                  {fields.map(field => {
                    const nameField = fieldName(field);
                    return (
                      <div className="BrowseTableSection-column"
                           style={{ width: rowSizes[field] }}
                           key={field}>
                        <div className="BrowseTableSection-title">{nameField}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

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
               onScroll={this.handleScroll}
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
                                    sections={activeSections}
                                    onOpen={this.openInstances}
                                    onCheck={this.toggleChecked}
                                    checked={checked[instanceId] === true}/>
                );
              })}
            </div>
          </div>
        </div>

        {/*
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

         {activeSections.map(section => {
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
         */}
      </div>
    );
  }
};
