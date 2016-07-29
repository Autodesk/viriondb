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
import merge from 'lodash.merge';
import { errorDoesNotExist, errorFileSystem } from './../utils/errors';
import mkpath from 'mkpath';
import rimraf from 'rimraf';
import fs from 'fs';
import mv from 'mv';

const parser = (string) => {
  if (typeof string !== 'string') {
    return string;
  }
  try {
    return JSON.parse(string);
  } catch (err) {
    console.error(err);
    return {};
  }
};

const stringifier = (obj) => {
  if (typeof obj === 'string') {
    return obj;
  }
  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    console.error(err);
    return '';
  }
};

//note that node docs recommend avoiding checking if files exist, and just opening them directly in case of race conditions. This function is however useful to avoid overwriting / re-initializing a directory or file.
export const fileExists = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err || !stats.isFile()) {
        return reject(errorDoesNotExist);
      }
      resolve(path);
    });
  });
};

export const fileRead = (path, jsonParse = true) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, result) => {
      if (err) {
        return reject(err);
      }
      const parsed = !!jsonParse ? parser(result) : result;
      resolve(parsed);
    });
  });
};

export const fileWrite = (path, contents, stringify = true) => {
  return new Promise((resolve, reject) => {
    const fileContent = !!stringify ? stringifier(contents) : contents;
    fs.writeFile(path, fileContent, 'utf8', (err) => {
      if (err) {
        console.log('Error writing file');
        console.log(err);
        return reject(err);
      }
      resolve(path);
    });
  });
};

//todo - test
export const fileMerge = (path, toMerge) => {
  invariant(typeof toMerge === 'object', 'must pass an object for file merge');

  return fileRead(path)
    .then(contents => fileWrite(path, merge(contents, toMerge)));
};

export const fileDelete = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(path);
    });
  });
};

export const fileCopy = (source, target) => {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(source);
    rd.on('error', reject);
    const wr = fs.createWriteStream(target);
    wr.on('error', reject);
    wr.on('finish', resolve);
    rd.pipe(wr);
  });
};

export const directoryExists = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err || !stats.isDirectory()) {
        return reject(err);
      }
      resolve(path);
    });
  });
};

export const directoryMake = (path) => {
  return new Promise((resolve, reject) => {
    mkpath(path, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(path);
    });
  });
};

export const directoryContents = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, contents) => {
      if (err) {
        return reject(err);
      }
      resolve(contents);
    });
  });
};

export const directoryDelete = (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(path);
    });
  });
};

export const directoryMove = (path, newPath) => {
  return new Promise((resolve, reject) => {
    mv(path, newPath, { mkdirp: true }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(newPath);
    });
  });
};
