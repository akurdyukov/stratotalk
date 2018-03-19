import React from 'react';
import PropTypes from 'prop-types';
import { Table, Loader, Button } from 'semantic-ui-react';
import _ from 'lodash';

export default class Games extends React.PureComponent {
  static propTypes = {
    games: PropTypes.array.isRequired,
    scenarios: PropTypes.array.isRequired,
    currentEmail: PropTypes.string.isRequired, // current user email
    join: PropTypes.func.isRequired, // action for 'join the game'
  }

  getScenarioName = (id) => {
    if (this.props.scenarios.length === 0) {
      return (<Loader active inline="centered" size="mini" />);
    }
    const scenario = _.find(this.props.scenarios, (s) => s.id === id);
    return scenario ? scenario.name : null;
  }

  canJoin = () => (_.find(this.props.games, (g) => (this.props.currentEmail in g.roles)) === undefined);

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Участники</Table.HeaderCell>
            <Table.HeaderCell>Начало</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.games.map(g => (
            <Table.Row key={g.id}>
              <Table.Cell>{this.getScenarioName(g.scenarioId)}</Table.Cell>
              <Table.Cell>
                {_.toPairs(g.roles).map(([email, role]) => (
                  <span key={role}>{email} ({role})</span>
                ))}
              </Table.Cell>
              <Table.Cell>{g.startDate.fromNow()}</Table.Cell>
              <Table.Cell>
                {this.canJoin() && (
                  <Button onClick={() => { this.props.join(g, this.props.currentEmail); }} size="tiny">Войти</Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
