import React, { Component, PropTypes } from 'react';
import { rowHierarchy } from '../constants/rows';

import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    openInstances: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  state = {
    checked: { 'M14008.1': true },
    hovered: null,
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

  openInstances = () => {
    this.props.openInstances(...Object.keys(this.state.checked));
  };

  render() {
    const { instances } = this.props;
    const { hovered, checked } = this.state;

    return (
      <div className="BrowseTable"
           onMouseLeave={(evt) => this.setHovered(null)}
           onMouseEnter={(evt) => this.setHovered(null)}>
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>
        </div>
        <p>Re-architect so each row is a component, can scroll. need to pass width down. Or, use flexbox so header is fixed and contents scroll.</p>

        <div className="BrowseTable-values"
             onMouseEnter={(evt) => evt.stopPropagation()}>
          <BrowseTableHeaderColumn checked={checked}
                                   hovered={hovered}
                                   onHover={this.setHovered}
                                   onCheck={this.toggleChecked}
                                   onOpen={this.openInstances}
                                   onCompare={this.openInstances}
                                   instances={instances}/>

          {rowHierarchy.map(section => {
            const { name, fields } = section;
            return (<BrowseTableSection key={name}
                                        name={name}
                                        fields={fields}
                                        onHover={this.setHovered}
                                        hovered={hovered}
                                        checked={checked}
                                        instances={instances}/>);
          })}
        </div>
      </div>
    );
  }
};
