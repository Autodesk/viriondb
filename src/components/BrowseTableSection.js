import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';

import '../styles/BrowseTableSection.css';

export default class BrowseTableSection extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    instances: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  //todo - componentize
  render() {
    const { name, fields, instances } = this.props;

    return (
      <div className="BrowseTableSection">
        <div className="BrowseTableSection-heading">
          {name}
        </div>

        {fields.map(field => {
          const nameField = fieldName(field);
          return (
            <div className="BrowseTableSection-column"
                 key={field}>
              <div className="BrowseTableSection-title">{nameField}</div>

              <div className="BrowseTableSection-values">
                {instances.map(instance => {
                  return (
                    <div className="BrowseTableSection-cell"
                         key={instance.id}>
                      {instance[field]}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>
    );
  }
}
