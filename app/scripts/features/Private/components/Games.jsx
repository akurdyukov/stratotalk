import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

import GameItem from './GameItem';
import { GameStates } from '../../../constants/gameStates';

export default class Games extends React.PureComponent {
  static propTypes = {
    currentEmail: PropTypes.string.isRequired, // current user email
    games: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired, // action for 'join the game'
    scenarios: PropTypes.array.isRequired,
  }

  getScenarioName = (id) => {
    if (this.props.scenarios.length === 0) {
      return null;
    }
    const scenario = _.find(this.props.scenarios, (s) => s.id === id);
    return scenario ? (scenario.name) : null;
  }

  canJoin = (game) => (!(this.props.currentEmail in game.roles) && game.state === GameStates.BOARDING);

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Участники</Table.HeaderCell>
            <Table.HeaderCell>Состояние</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.games.map(g => (
            <GameItem
              key={g.id}
              game={g}
              join={this.props.join}
              scenarioName={this.getScenarioName(g.scenarioId)}
              canJoin={this.canJoin(g)}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}
