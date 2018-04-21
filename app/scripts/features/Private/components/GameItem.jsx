import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ROUTE_GAME_PROCESS } from '../../../constants/routes';
import { GameStates } from '../../../constants/gameStates';
import { ROLE_WATCHER } from '../../../constants/roles';

export default class GameItem extends React.PureComponent {
  static propTypes = {
    canJoin: PropTypes.bool.isRequired,
    game: PropTypes.object,
    join: PropTypes.func.isRequired, // action for 'join the game'
    scenarioName: PropTypes.string, // null if loading
  }

  getGameState = () => {
    switch (this.props.game.state) {
      case GameStates.BOARDING:
        return 'Собирается';
      case GameStates.PREPARING:
        return 'Подготовка';
      case GameStates.RUNNING:
        return 'Переговоры';
      case GameStates.SCORING:
        return 'Оценка';
      default:
        return '???';
    }
  }

  getReadableRole = (role) => {
    return (role === ROLE_WATCHER) ? 'Наблюдатель' : role;
  }

  render() {
    const g = this.props.game;
    const dest = ROUTE_GAME_PROCESS.replace(':id', this.props.game.id);

    const name = this.props.scenarioName !== null ?
      this.props.scenarioName :
      (<Loader active inline="centered" size="mini" />);

    return (
      <Table.Row key={g.id}>
        <Table.Cell><Link to={dest}>{name}</Link></Table.Cell>
        <Table.Cell>
          {_.toPairs(g.roles).map(([email, role]) => (
            <div key={role}>{email} ({this.getReadableRole(role)})</div>
          ))}
        </Table.Cell>
        <Table.Cell>
          {this.getGameState()}
        </Table.Cell>
        <Table.Cell>
          {this.props.canJoin && (
            <Button onClick={() => { this.props.join(g.id); }} size="tiny">Войти</Button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}
