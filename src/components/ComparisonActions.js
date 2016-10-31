/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { PropTypes, Component } from 'react';
import { favorites } from '../data/favorites';

import '../styles/ComparisonActions.css';

export default class ComparisonActions extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    onStar: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const { instances, onStar, onRemove } = this.props;
    return (
      <div className="ComparisonActions">
        <div className="ComparisonActions-key"></div>

        {instances.map(instance => {
          const isStarred = favorites.indexOf(instance.id) >= 0;
          return (
            <div key={instance.id}
                 className="ComparisonActions-value">

              {instances.length > 1 && (<span className="ComparisonActions-remove"
                                              onClick={() => onRemove(instance.id)}>
                    Remove
                  </span>)}

                  <span className={'ComparisonActions-star' + (isStarred ? ' active' : '')}
                        onClick={() => onStar(instance.id)}>
                  </span>
            </div>
          );
        })}
      </div>
    );
  }
}
