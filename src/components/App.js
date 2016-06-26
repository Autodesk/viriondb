import React, { Component, PropTypes } from 'react';

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
        <p>App</p>
        <div className="App-pageContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}
