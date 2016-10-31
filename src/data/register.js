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
import fetch from 'isomorphic-fetch';

export const registry = {};

const callbacks = [];

const safelyRunCallback = (cb) => {
  const number = Object.keys(registry).length;
  try {
    cb(registry, number);
  } catch (err) {
    console.error(err);
  }
};

const safelyRunCallbacks = () => {
  callbacks.forEach(cb => safelyRunCallback(cb));
};

export const onRegister = (cb) => {
  callbacks.push(cb);
  safelyRunCallback(cb);
  return function deregister() {
    callbacks.splice(callbacks.indexOf(cb), 1);
  };
};

//load data lazily
fetch('/data/all')
  .then(resp => resp.json())
  .then(json => {
    Object.assign(registry, json);
    safelyRunCallbacks();
  });

export const loadInstance = (...ids) => {
  return fetch(`/data/id/${ids.join(',')}`)
    .then(resp => resp.json())
    .then(instanceMap => {
      Object.assign(registry, instanceMap);
      safelyRunCallbacks();
      return registry;
    });
};

export default registry;

