import React from 'react';
import PropTypes from 'prop-types';

export default class Feature extends React.PureComponent {
  static propTypes = {
    children: PropTypes.array,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.onActivate) {
      this.props.onActivate();
    }
  }

  componentWillUnmount() {
    if (this.props.onDeactivate) {
      this.props.onDeactivate();
    }
  }

  render() {
    return this.props.children;
  }
}
