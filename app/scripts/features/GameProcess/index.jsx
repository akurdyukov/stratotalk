import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ROUTE_PRIVATE } from '../../constants/routes';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';

import BoardingScreen from './components/BoardingScreen';
import PreparingScreen from './components/PreparingScreen';
import RunningScreen from './components/RunningScreen';
import ScoringScreen from './components/ScoringScreen';

class GameProcess extends React.PureComponent {
    static propTypes = {
      activate: PropTypes.func.isRequired,
      currentEmail: PropTypes.string.isRequired,
      deactivate: PropTypes.func.isRequired,
      game: PropTypes.object, // is null on first load
      goPrivate: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      scenario: PropTypes.object, // is null on first load
      startPrepare: PropTypes.func.isRequired,
      startRun: PropTypes.func.isRequired,
      startScore: PropTypes.func.isRequired,
    };

    activateUi = () => {
      this.props.activate(this.props.match.params.id);
    }

    goToMain = () => {

    }

    getCurrentScreen = () => {
      if (this.props.game === null) {
        return null;
      }
      switch (this.props.game.state) {
        case 'BOARDING':
          return (
            <BoardingScreen game={this.props.game} scenario={this.props.scenario} nextAction={this.props.startPrepare} />
          );
        case 'PREPARING':
          return (
            <PreparingScreen
              currentEmail={this.props.currentEmail}
              game={this.props.game}
              scenario={this.props.scenario}
              nextAction={this.props.startRun}
            />
          );
        case 'RUNNING':
          return (
            <RunningScreen game={this.props.game} scenario={this.props.scenario} nextAction={this.props.startScore} />
          );
        case 'SCORING':
          return (
            <ScoringScreen game={this.props.game} scenario={this.props.scenario} nextAction={() => this.props.goPrivate()} />
          );
        default:
          return null;
      }
    }

    render() {
      return (
        <Feature onActivate={this.activateUi} onDeactivate={this.props.deactivate}>
          <AppHeader location={this.props.location} />

          {this.getCurrentScreen()}
        </Feature>
      );
    }
}

export default connect((state) => ({
  scenario: state.gameProcess.scenario,
  game: state.gameProcess.game,
  currentEmail: state.user.user.email,
}), {
  activate: actions.gameProcessActivated,
  deactivate: actions.gameProcessDeactivated,
  startPrepare: actions.gameStartPrepare,
  startRun: actions.gameStartRun,
  startScore: actions.gameStartScore,
  goPrivate: () => push(ROUTE_PRIVATE),
})(GameProcess);
