import React, { Component, PropTypes } from 'react';

export class MoleculeViewer extends Component {
  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: 'http://molecularviewer.bionano.autodesk.com/?nosplash=true'
  };

  render() {
    return (
        <div className="MoleculeViewer">
          <iframe ref="iframe"
                  src={this.props.url} />
        </div>
    );
  }
}

export default MoleculeViewer;