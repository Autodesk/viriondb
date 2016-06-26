import React, { PropTypes, Component } from 'react';

import '../styles/ComparisonActions.css';

export default class ComparisonActions extends Component {
	static propTypes = {
		instances: PropTypes.array.isRequired,
	};

	onClickStar = (instanceId) => {
		console.log('starred ' + instanceId);
	};

	onClickRemove = (instanceId) => {
		//todo
		console.log('remove ' + instanceId);
	};

	render() {
		const { instances } = this.props;
		return (
			<div className="ComparisonActions">
				<div className="ComparisonActions-key"></div>

				{instances.map(instance => {
		          return (
		            <div key={instance.id}
		                 className="ComparisonActions-value">

	                 {instances.length > 1 && (<span className="ComparisonActions-remove"
	                 	   onClick={() => this.onClickRemove(instance.id)}>
		              	Remove
		              </span>)}

		              <span className="ComparisonActions-star"
		              		onClick={() => this.onClickStar(instance.id)}>
		              		❤️
	              	  </span>
		            </div>
		          )
		        })}
			</div>
		);
	}
}
