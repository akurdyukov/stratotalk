import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Segment, Icon } from 'semantic-ui-react';
import ReactCountdownClock from 'react-countdown-clock';

import './RunningScreen.scss';
import { GameStates } from '../../../constants/gameStates';
import { getSecondsLeft } from '../tools';

export default class RunningScreen extends React.PureComponent {
  static propTypes = {
    game: PropTypes.object, // is null on first load
    nextAction: PropTypes.func.isRequired,
    scenario: PropTypes.object, // is null on first load
  }

  render() {
    const loading = (this.props.game === null || this.props.scenario === null);
    const left = getSecondsLeft(this.props.game, GameStates.RUNNING);
    return (
      <Segment loading={loading}>
        { this.props.scenario && (
          <Header icon textAlign="center">
            { left !== null && (
              <ReactCountdownClock seconds={left} size={100} />
            )}
            <Icon name="users" circular />
            <Header.Content>
              Переговоры: {this.props.scenario.name}...
            </Header.Content>
          </Header>
        )}
        <Button floated="right" primary onClick={() => this.props.nextAction()}>Дальше</Button>
      </Segment>
    );
  }
}
