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

