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
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
