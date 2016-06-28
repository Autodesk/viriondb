import React, { Component, PropTypes } from 'react';
import { rowHierarchy } from '../constants/rows';

import BrowseTableSection from './BrowseTableSection';
import BrowseTableHeaderColumn from './BrowseTableHeaderColumn';

import '../styles/BrowseTable.css';

export default class BrowseTable extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  render() {
    const { instances } = this.props;

    return (
      <div className="BrowseTable">
        <div className="BrowseTable-heading">
          <span>Browse Results</span>
          <span className="BrowseTable-heading-detail">{instances.length}</span>

          <p>Todo - reorganize so each instance gets its own row. give each row fixed width. maybe they can resize later</p>
        </div>
        
        <div className="BrowseTable-values">
          <BrowseTableHeaderColumn instances={instances}/>

          {rowHierarchy.map(section => {
            const { name, fields } = section;
            return (<BrowseTableSection key={name}
                                        name={name}
                                        fields={fields}
                                        instances={instances}/>);
          })}
        </div>
      </div>
    );
  }
};
