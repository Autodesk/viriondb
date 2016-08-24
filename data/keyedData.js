import data from './data';

const map = {};
for (let ind = 0; ind < data.length; ind++) {
  map[data[ind].id] = data[ind];
}

export default map;
