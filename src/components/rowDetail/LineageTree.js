import React, { PropTypes, Component } from 'react';

export default class LineageTree extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    if (!this.props.value) {
      return null;
    }

    const tax = this.props.value.split(': ');
    /*
     .replace('[', '')
     .replace(']', '')
     .trim()
     .replace(/\'/gi, '')
     .split(', ');
     */

    return null;

    /*
    return (
      <div className="LineageTree">
        <ul>
          {tax.map(level => (<li>{level}</li>)) }
        </ul>
      </div>
    );
    */
  }
};
