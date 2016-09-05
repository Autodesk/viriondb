import d3 from 'd3';

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
  .outerRadius(radius * 0.9)
  .innerRadius(radius * 0.72);

export const massageData = (map, skipFilter = false) => Object.keys(map).map(key => ({
  key,
  value: map[key],
}))
  .filter(obj => obj.key !== 'null')
  .filter(obj => skipFilter || obj.value > 0);

export const keyFn = (d) => d.data.key;

/* line and bar */

export const lineWidth = 5;
