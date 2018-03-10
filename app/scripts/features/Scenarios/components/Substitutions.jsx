import React from 'react';
import PropTypes from 'prop-types';

export default class Substitutions extends React.PureComponent {
    static propTypes = {
      sub: PropTypes.object.isRequired,
    };

    render() {
      const { sub } = this.props;
      return (
        <li>
          {sub.id}
          <ul>
            {sub.text.map((t, index) => (
              <li key={`${sub.id}-${index}`}>{t}</li>
            ))}
          </ul>
        </li>
      );
    }
}
