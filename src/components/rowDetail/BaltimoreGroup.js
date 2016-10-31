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
import React, { PropTypes, Component } from 'react';

export default class BaltimoreGroup extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.styles = {
      display: 'inline-block',
      padding: '0',
      margin: '1em auto',
      height: '230px',
      width: 'auto',
    };
  }

  makeImageUrl = () => `/images/baltimore/${this.props.value.toUpperCase()}.gif`;

  render() {
    return (
      <div className="BaltimoreGroup">
        <img style={this.styles}
             src={this.makeImageUrl()}/>
        <a className="ComparisonRow-link ComparisonRow-offsite"
           target="_blank"
           href="https://commons.wikimedia.org/w/index.php?curid=32198313">
          By Sara Confalonieri - Own work, CC BY-SA 3.0 (Wikimedia)
        </a>
      </div>
    );
  }
};
