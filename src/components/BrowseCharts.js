import React, { Component, PropTypes } from 'react';

import BrowseChart from './BrowseChart';

import '../styles/BrowseCharts.css';

export default class BrowseCharts extends Component {
  static propTypes = {
    noInstances: PropTypes.bool.isRequired,
    derivedData: PropTypes.object.isRequired,
  };

  render() {
    const { noInstances, derivedData } = this.props;

    return (
      <div className="BrowseCharts">
        <div className="BrowseCharts-heading">Explore Viral Metadata</div>

        <div className="BrowseCharts-content">
          {noInstances && <div className="BrowseCharts-empty">No Data</div>}
          {!noInstances && Object.keys(derivedData).map(field => (
            <BrowseChart key={field}
                         field={field}
                         data={derivedData[field]}/>
          ))}
        </div>
      </div>
    );
  }
};
