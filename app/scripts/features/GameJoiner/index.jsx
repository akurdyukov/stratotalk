import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ROUTE_PRIVATE } from '../../constants/routes';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';

class GameJoiner extends React.PureComponent {
    static propTypes = {
      activate: PropTypes.func.isRequired,
      currentEmail: PropTypes.string.isRequired,
      deactivate: PropTypes.func.isRequired,
      game: PropTypes.object, // is null on first load
      goPrivate: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      scenario: PropTypes.object, // is null on first load
    };

    activateUi = () => {
      this.props.activate(this.props.match.params.id);
    }

    goToMain = () => {

    }

    render() {
      return (
        <Feature onActivate={this.activateUi} onDeactivate={this.props.deactivate}>
          <AppHeader location={this.props.location} />

          Тут будет выбор роли
        </Feature>
      );
    }
}

export default connect((state) => ({
  scenario: state.gameProcess.scenario,
  game: state.gameProcess.game,
  currentEmail: state.user.user.email,
}), {
  activate: actions.gameJoinerActivated,
  deactivate: actions.gameJoinerDeactivated,
  goPrivate: () => push(ROUTE_PRIVATE),
})(GameJoiner);
