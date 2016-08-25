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
import invariant from 'invariant';

/* local storage middleware */

const storage = global.localStorage;

function getItem(id) {
  try {
    return storage.getItem(id);
  } catch (err) {
    console.warn('local storage error getting item'); //eslint-disable-line no-console
    return undefined;
  }
}

function setItem(id, value) {
  invariant(id, 'id is required to setItem');
  invariant(typeof value === 'string', 'value must be a string');

  try {
    return storage.setItem(id, value);
  } catch (err) {
    console.warn(err); //eslint-disable-line no-console
    return value;
  }
}

/* starring stuff */

const localStorageKey = 'viriondb_favorites';

const getFavorites = () => {
  const stored = getItem(localStorageKey);
  return !!stored ? JSON.parse(stored) : [];
};

export const favorites = getFavorites();

export const star = (id) => {
  const index = favorites.indexOf(id);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  setItem(localStorageKey, JSON.stringify(favorites));
  return favorites;
};

