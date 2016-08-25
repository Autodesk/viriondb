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

export const activeFilters = {};

const callbacks = [];

const safelyRunCallback = (cb) => {
  try {
    cb(activeFilters);
  } catch (err) {
    console.error(err);
  }
};

const safelyRunCallbacks = () => {
  callbacks.forEach(cb => safelyRunCallback(cb));
};

export const onRegisterFilter = (cb) => {
  callbacks.push(cb);
  safelyRunCallback(cb);
  return function deregister() {
    callbacks.splice(callbacks.indexOf(cb), 1);
  };
};

export const setFilter = (filterPatch) => {
  Object.assign(activeFilters, filterPatch);

  //remove nulls from filters
  Object.keys(activeFilters).forEach(key => {
    if (activeFilters[key] === null) {
      delete activeFilters[key];
    }
  });

  safelyRunCallbacks();

  return activeFilters;
};

export default activeFilters;
