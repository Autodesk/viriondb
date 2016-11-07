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
import React, { Component } from 'react';

import '../styles/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-autodesk"/>
        <div className="Footer-right">
          <div className="Footer-links">
            <a className="Footer-link"
               target="_blank"
               href="https://forum.bionano.autodesk.com/t/about-viriondb/">About VirionDB</a>
            <a className="Footer-link"
               href="https://forum.bionano.autodesk.com/c/viriondb"
               target="_blank">Community</a>
            <a className="Footer-link"
               target="_blank"
               href="https://forum.bionano.autodesk.com/t/feedback/127">Feedback</a>
            <a className="Footer-link"
               target="_blank"
               href="http://bionano.autodesk.com/">More Bio Nano Tools</a>
          </div>
          <div className="Footer-logo"/>
        </div>
      </div>
    );
  }
}
