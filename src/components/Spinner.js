import React, { PropTypes } from 'react';

import '../styles/Spinner.css';

export default function Spinner({ hidden, style }) {
  if (hidden) {
    return null;
  }

  return (<div className="Spinner" style={style}/>);
}

Spinner.propTypes = {
  hidden: PropTypes.bool,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  hidden: false,
  style: {},
};
