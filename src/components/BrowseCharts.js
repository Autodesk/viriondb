import React, {Component, PropTypes} from 'react';

import BrowseChart from './BrowseChart';

import '../styles/BrowseCharts.css';

export default class BrowseCharts extends Component {
  static propTypes = {
  	instances: PropTypes.array.isRequired,
  	derivedData: PropTypes.object.isRequired,
  };

  render() {
  	const { derivedData } = this.props;

    return (
        <div className="BrowseCharts">
        	<div className="BrowseCharts-heading">Explore Viral Metadata</div>

        {Object.keys(derivedData).map(field =>
        	<BrowseChart field={field}
        				 type={}	
        				 data={derivedData[field]} />
        })}

        </div>
    );
  }
};
