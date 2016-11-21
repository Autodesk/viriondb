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
import d3 from 'd3';
import _ from 'lodash';

export const graphWidth = 300;
export const graphHeight = 170; //pie (line is 150)

/* layout */

export const width = 120;
export const height = 120;

export const widthLarge = 160;
export const heightLarge = 160;

//todo - smarter
export const widthLargeInner = 110;
export const heightLargeInner = 70;

export const defaultColor = '#9999dd';

/* pie chart */

export const radius = Math.min(width, height) / 2;

export const pie = d3.layout.pie()
//todo - padding
  .padAngle(0.025)
  .sort(null)
  .value(d => typeof d === 'number' ? d : d.value);

export const arc = d3.svg.arc()
  .outerRadius(radius * 0.75)
  .innerRadius(radius * 0.6);

export const outerArc = d3.svg.arc()
  .outerRadius(radius * 0.95)
  .innerRadius(radius * 0.95);

export const massageData = (map, skipFilter = false) => {
  //const total = _.reduce(map, (acc, val, key) => acc + val, 0);

  return _.map(map, (val, key) => ({
    key,
    value: val,
    //percent: (val / total * 100).toPrecision(2),
  }))
    .filter(obj => obj.key !== 'null')
    .filter(obj => skipFilter || obj.value > 0);
};

export const keyFn = (d) => d.data.key;

/* line and bar */

export const transitionDuration = 500;

export const lineWidth = 5;
