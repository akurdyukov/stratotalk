import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Segment, Icon, List } from 'semantic-ui-react';
import _ from 'lodash';

import { ROLE_WATCHER } from '../../../constants/roles';

export default class BoardingScreen extends React.PureComponent {
  static propTypes = {
    game: PropTypes.object, // is null on first load
    nextAction: PropTypes.func.isRequired,
    scenario: PropTypes.object, // is null on first load
  }

  findEmailsForRole = (roleName) => {
    const pairs = _.toPairs(this.props.game.roles);
    return _.filter(pairs, (pair) => pair[1] === roleName).map((pair) => pair[0]);
  }

  areRolesOccupied = () => {
    if (this.props.scenario === null) {
      return false;
    }

    const roleToEmail = this.props.scenario.roles.map((r) => this.findEmailsForRole(r.name));
    return _.findKey(roleToEmail, (emails) => emails.length === 0) === undefined;
  }

  getRoleItem = (role) => {
    const emails = this.findEmailsForRole(role.name);
    const icon = emails.length === 0 ? 'wait' : 'check circle';
    const roleName = role.name === ROLE_WATCHER ? 'Наблюдатели' : role.name;
    return (
      <List.Item key={role.name}>
        <List.Icon name={icon} size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>{roleName}</List.Header>
          <List.Description>
            {emails.length === 0 ? 'Ждем подключения...' : emails.map((e) => (<span key={e}>{e}</span>))}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }

  render() {
    const loading = (this.props.game === null || this.props.scenario === null);
    return (
      <Segment loading={loading}>
        { this.props.scenario && (
          <React.Fragment>
            <Header icon textAlign="center">
              <Icon name="clock" circular />
              <Header.Content>
              Ждем сбора участников на игру по сценарию {this.props.scenario.name}...
              </Header.Content>
            </Header>
            <List relaxed>
              {this.props.scenario.roles.map((r) => this.getRoleItem(r))}
              {this.getRoleItem({ name: ROLE_WATCHER })}
            </List>
          </React.Fragment>
        )}
        <Button
          floated="right"
          primary
          onClick={() => this.props.nextAction()}
          disabled={!this.areRolesOccupied()}
        >Дальше
        </Button>
      </Segment>
    );
  }
}
