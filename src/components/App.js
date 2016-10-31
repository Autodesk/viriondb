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
import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Footer from './Footer';

import '../styles/App.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node, // Injected by React Router
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.object,
  };

  render() {
    const onCompare = this.props.params && !!this.props.params.instances;
    return (
      <div className="App">
        <Header showSearch={!onCompare}/>
        <div className="App-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
