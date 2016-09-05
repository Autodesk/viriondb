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
