import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, Button, Segment, Message } from 'semantic-ui-react';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';

import ScenarioSelector from './components/ScenarioSelector';
import RoleSelector from './components/RoleSelector';

class GameCreator extends React.PureComponent {
    static propTypes = {
      activate: PropTypes.func.isRequired,
      deactivate: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      scenarios: PropTypes.object.isRequired,
      selectedScenario: PropTypes.object,
      selectScenario: PropTypes.func.isRequired,

      roles: PropTypes.array,
      selectedRole: PropTypes.string,
      selectRole: PropTypes.func.isRequired,

      createGame: PropTypes.func.isRequired,

      errorMessage: PropTypes.string,
    };

    handleCreate = () => {
      const { selectedScenario, selectedRole } = this.props;
      if (selectedScenario && selectedRole) {
        this.props.createGame(selectedScenario, selectedRole);
      }
    }

    render() {
      return (
        <Feature onActivate={this.props.activate} onDeactivate={this.props.deactivate}>
          <AppHeader location={this.props.location} />
          <Segment>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">Выберете сценарий</Header>
                  <ScenarioSelector
                    scenarios={this.props.scenarios}
                    selectedScenario={this.props.selectedScenario}
                    selectScenario={this.props.selectScenario}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as="h1">Выберете роль</Header>
                  <RoleSelector
                    roles={this.props.roles}
                    selectedRole={this.props.selectedRole}
                    selectRole={this.props.selectRole}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {this.props.errorMessage && (
              <Message error>
                {this.props.errorMessage}
              </Message>
            )}
            <Button onClick={this.handleCreate} floated="right" primary>Создать</Button>
          </Segment>
        </Feature>
      );
    }
}

export default connect((state) => ({
  scenarios: state.scenarios,
  selectedScenario: state.gameCreator.scenario,
  roles: state.gameCreator.roles,
  selectedRole: state.gameCreator.role,
  errorMessage: state.gameCreator.errorMessage,
}), {
  activate: actions.gameCreatorActivated,
  deactivate: actions.gameCreatorDeactivated,
  selectScenario: actions.selectScenario,
  selectRole: actions.selectRole,
  createGame: actions.createGame,
})(GameCreator);
