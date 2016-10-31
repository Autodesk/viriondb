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
var fs = require('fs');
var route = require('http-route');

var packageJSON = require('../package.json');
var versionFilePath = __dirname + "/../VERSION";

var newLine = /\n/g;

function getVersion() {
  var version = packageJSON.version;
  try {
    version = fs.readFileSync(versionFilePath, {
      encoding: 'utf8',
    });
    if (version && (version != '')) {
      version = version.replace(newLine, '');
    }
  } catch (e) {
    if (e.code && e.code === 'ENOENT') {
      // do nothing
    } else {
      console.log("unexpected error loading version from", versionFilePath);
      console.log(e);
    }
  }

  return version;
}

var VERSION = getVersion();

function version(req, res) {
  res.statusCode = 200;
  res.send(VERSION);
  return res.end();
}

module.exports = route('GET /version', version);
