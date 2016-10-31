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
import { Link } from 'react-router';

import SearchBar from './SearchBar';

import '../styles/Header.css';

export default class Header extends Component {
  static propTypes = {
    showSearch: PropTypes.bool.isRequired,
  };

  render() {
    const loc = window.location;
    const subject = 'Virion DB Link'.replace(' ', '%20');
    const body = encodeURIComponent(`Check out this page on Virion DB:

${loc}`);
    const mailLink = `mailto:?subject=${subject}&body=${body}`;

    return (
      <div className="Header">
        <div className="Header-nav">
          <Link className="Header-home" to="/"/>
        </div>
        {this.props.showSearch && (<SearchBar />)}
        <div className="Header-icons">
          {this.props.showSearch && (<div className={'Header-icon Header-lens'}
                                          onClick={this.onClickLens}></div>)}
          <a className="Header-icon Header-share"
             href={mailLink}/>
          <a className="Header-icon Header-feedback"
             href="https://forum.bionano.autodesk.com/t/feedback/127"
             target="_blank"/>
        </div>
      </div>
    );
  }
}
