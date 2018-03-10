import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import userActions from '../framework/actions/user';
import { ROUTE_PRIVATE, ROUTE_SCENARIOS } from '../constants/routes';

class Header extends React.PureComponent {
  static propTypes = {
    goPrivate: PropTypes.func.isRequired,
    goScenarios: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const path = this.props.location.pathname;

    return (
      <Menu borderless size="huge" fluid>
        <Menu.Item header>StratoTalks</Menu.Item>

        <Menu.Item name="private" onClick={this.props.goPrivate} active={path === ROUTE_PRIVATE}>Главная</Menu.Item>
        <Menu.Item name="scenarios" onClick={this.props.goScenarios} active={path === ROUTE_SCENARIOS}>Сценарии</Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item onClick={this.props.logout}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, {
  logout: userActions.userLogoutRequest,
  goPrivate: () => push(ROUTE_PRIVATE),
  goScenarios: () => push(ROUTE_SCENARIOS),
})(Header);
