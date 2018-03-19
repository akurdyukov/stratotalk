import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Grid, Header, Button } from 'semantic-ui-react';

import Games from './components/Games';
import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';
import { ROUTE_GAME_CREATOR } from '../../constants/routes';

class Private extends React.PureComponent {
  static propTypes = {
    activate: PropTypes.func.isRequired,
    createNewGame: PropTypes.func.isRequired,
    currentEmail: PropTypes.string.isRequired, // current user email
    deactivate: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired, // action to join the game
    location: PropTypes.object.isRequired,
    scenarios: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Feature onActivate={this.props.activate} onDeactivate={this.props.deactivate}>
        <AppHeader location={this.props.location} />
        <Grid columns={2} container divided="vertically">
          <Grid.Column>
            <Header as="h1">Игры <Button floated="right" onClick={this.props.createNewGame}>Новая</Button></Header>
            <Games
              games={this.props.games} scenarios={this.props.scenarios}
              currentEmail={this.props.currentEmail} join={this.props.join}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h1">Статистика</Header>

          </Grid.Column>
        </Grid>
      </Feature>
    );
  }
}

const mapStateToProps = (state) => ({
  games: state.main.games,
  scenarios: state.scenarios.all,
  currentEmail: state.user.user.email,
});

export default connect(mapStateToProps, {
  activate: actions.mainActivated,
  deactivate: actions.mainDeactivated,
  join: actions.joinGame,
  createNewGame: () => push(ROUTE_GAME_CREATOR),
})(Private);
