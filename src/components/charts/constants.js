import d3 from 'd3';

/* layout */

export const width = 120;
export const height = 120;

export const widthLarge = 160;
export const heightLarge = 160;

export const defaultColor = '#9999dd';

/* pie chart */

export const radius = Math.min(width, height) / 2;

export const pie = d3.layout.pie()
//todo - padding
  .padAngle(0.025)
  .sort(null)
  .value(d => d.value);

export const arc = d3.svg.arc()
  .outerRadius(radius * 0.9)
  .innerRadius(radius * 0.72);

export const massageData = (map) => Object.keys(map).map(key => ({
  key,
  value: map[key],
}))
  .filter(obj => obj.value > 0);

export const keyFn = (d) => d.data.key;

/* line and bar */

export const lineWidth = 5;
