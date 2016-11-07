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
import { rows } from '../constants/rows';

import Capsid3d from './rowDetail/Capsid3d';
import BaltimoreGroup from './rowDetail/BaltimoreGroup';
import Host from './rowDetail/Host';
import NCBI from './rowDetail/NCBI';
import Sequence from './rowDetail/Sequence';
import LineageTree from './rowDetail/LineageTree';

export default class ComparisonRowDetail extends Component {
  static propTypes = {
    field: PropTypes.oneOf(rows).isRequired,
    value: PropTypes.any,
    instance: PropTypes.object.isRequired,
  };

  static componentMap = {
    id: NCBI,
    capsid_morphology: Capsid3d,
    derived_baltimore: BaltimoreGroup,
    host: Host,
    derived_lineage: LineageTree,
    length: Sequence,
  };

  render() {
    const { field, value, instance } = this.props;
    const DetailComponent = ComparisonRowDetail.componentMap[field];

    if (!DetailComponent || !value) {
      return null;
    }

    return (<DetailComponent {...this.props} />);
  }
}
