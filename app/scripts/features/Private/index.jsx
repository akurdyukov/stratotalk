import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Grid, Header, Button } from 'semantic-ui-react';

import Games from './components/Games';
import AppHeader from '../../components/Header';

import gameActions from './actions';
import { ROUTE_GAME_CREATOR } from '../../constants/routes';

class Private extends React.PureComponent {
  static propTypes = {
    createNewGame: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <AppHeader location={this.props.location} />
        <Grid columns={2} container divided="vertically">
          <Grid.Column>
            <Header as="h1">Игры <Button floated="right" onClick={this.props.createNewGame}>Новая</Button></Header>
            <Games />
          </Grid.Column>
          <Grid.Column>
            <Header as="h1">Статистика</Header>

          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {
  createNewGame: () => push(ROUTE_GAME_CREATOR),
})(Private);
