import React, { Component, PropTypes } from 'react';
import { fieldName } from '../constants/rows';

import '../styles/BrowseTableSection.css';

export default class BrowseTableSection extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    instances: PropTypes.array.isRequired,
    onHover: PropTypes.func.isRequired,
    checked: PropTypes.object.isRequired,
    hovered: PropTypes.string,
  };

  static defaultProps = {};

  //todo - componentize
  render() {
    const { name, fields, instances, onHover, hovered, checked } = this.props;

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
                  const isChecked = checked[instance.id];
                  const isHovered = hovered === instance.id;
                  return (
                    <div className={'BrowseTableSection-cell' +
                                   (isHovered ? ' hovered' : '') +
                                   (isChecked ? ' checked' : '')}
                         onMouseEnter={() => onHover(instance.id)}
                         key={instance.id}>
                      {instance[field] || '-'}
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
