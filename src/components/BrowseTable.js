import React, { Component, PropTypes } from 'react';
import { rowHierarchy } from '../constants/rows';

import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    compareInstances: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  state = {
    checked: new Set(['M14008.1']),
    hovered: null,
  };

  setHovered = (id) => {
    this.setState({ hovered: id });
  };

  toggleChecked = (id) => {
    this.state.checked.has(id) ?
      this.state.checked.delete(id) :
      this.state.checked.add(id);

    this.setState({
      checked: this.state.checked,
    });
  };

  compareInstances = () => {
    this.props.compareInstances(this.state.checked);
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

          <p>Todo - reorganize so each instance gets its own row. give each row fixed width. maybe they can resize
            later</p>
        </div>

        <div className="BrowseTable-values"
             onMouseEnter={(evt) => evt.stopPropagation()}>
          <BrowseTableHeaderColumn checked={checked}
                                   hovered={hovered}
                                   onHover={this.setHovered}
                                   onCheck={this.toggleChecked}
                                   onCompare={this.compareInstances}
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
