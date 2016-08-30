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
