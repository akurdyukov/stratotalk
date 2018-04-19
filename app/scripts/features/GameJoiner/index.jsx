import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';

import RoleSelector from './components/RoleSelector';

class GameJoiner extends React.PureComponent {
    static propTypes = {
      activate: PropTypes.func.isRequired,
      currentEmail: PropTypes.string.isRequired,
      deactivate: PropTypes.func.isRequired,
      game: PropTypes.object, // is null on first load
      joinGame: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      scenario: PropTypes.object, // is null on first load
      selectedRole: PropTypes.string,
      selectRole: PropTypes.func.isRequired,
    };

    activateUi = () => {
      this.props.activate(this.props.match.params.id);
    }

    render() {
      const isLoading = this.props.scenario === null || this.props.game === null;
      return (
        <Feature onActivate={this.activateUi} onDeactivate={this.props.deactivate}>
          <AppHeader location={this.props.location} />
          <Segment loading={isLoading}>
            {!isLoading && (
              <RoleSelector
                roles={this.props.scenario.roles}
                selectedRole={this.props.selectedRole}
                selectRole={this.props.selectRole}
                usedRoles={_.values(this.props.game.roles)}
              />
            )}

            <Button
              disabled={this.props.selectedRole === null}
              onClick={() => this.props.joinGame(this.props.game, this.props.currentEmail, this.props.selectedRole)}
            >Войти
            </Button>
          </Segment>
        </Feature>
      );
    }
}

export default connect((state) => ({
  scenario: state.gameJoiner.scenario,
  game: state.gameJoiner.game,
  currentEmail: state.user.user.email,
  selectedRole: state.gameJoiner.selectedRole,
}), {
  activate: actions.gameJoinerActivated,
  deactivate: actions.gameJoinerDeactivated,
  selectRole: actions.gameJoinerSelectRole,
  joinGame: actions.gameJoinerJoinGame,
})(GameJoiner);
