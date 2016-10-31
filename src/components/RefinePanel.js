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
import React, { Component, PropTypes } from 'react';
import { filters as filterSections } from '../constants/filters';
import RefineSection from './RefineSection';

import '../styles/RefinePanel.css';

export default class RefinePanel extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
  };

  render() {
    const { filters } = this.props;

    return (
      <div className="RefinePanel">
        <div className="RefinePanel-heading">
          Refine By
        </div>

        {filterSections.filter(section => section.visible !== false)
          .map(section => {
            const { field, type, ...rest } = section;
            return (
              <RefineSection key={field}
                             field={field}
                             type={type}
                             {...rest}
                             color={section.color}
                             filter={filters[field]}/>
            );
          })}
      </div>
    );
  }
}
