import React, {Component, PropTypes} from 'react';

import BrowseChart from './BrowseChart';

import '../styles/BrowseCharts.css';

export default class BrowseCharts extends Component {
  static propTypes = {
  	derivedData: PropTypes.object.isRequired,
  };

  render() {
  	const { derivedData } = this.props;
    
    return (
        <div className="BrowseCharts">
        	<div className="BrowseCharts-heading">Explore Viral Metadata</div>

          <div className="BrowseCharts-content">
            {Object.keys(derivedData).map(field => (
            	<BrowseChart key={field}
                           field={field}
            				       data={derivedData[field]} />
            ))}
          </div>
        </div>
    );
  }
};
