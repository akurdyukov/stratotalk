import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, Button, Segment, Message } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';

import formatScenario from '../../api/formatter';

class GameProcess extends React.PureComponent {
    static propTypes = {
      activate: PropTypes.func.isRequired,
      currentEmail: PropTypes.string.isRequired,
      deactivate: PropTypes.func.isRequired,
      game: PropTypes.object, // is null on first load
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      scenario: PropTypes.object, // is null on first load
    };

    activateUi = () => {
      this.props.activate(this.props.match.params.id);
    }

    render() {
      const view = (this.props.scenario !== null && this.props.game !== null) ?
        formatScenario(this.props.scenario, this.props.game.draw) : null;
      const roleName = this.props.game !== null ? this.props.game.roles[this.props.currentEmail] : null;
      const secretText = view !== null ? view.secretTexts[roleName] : null;

      return (
        <Feature onActivate={this.activateUi} onDeactivate={this.props.deactivate}>
          <AppHeader location={this.props.location} />
          <Segment loading={view === null}>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">Общие вводные</Header>

                  { view && (
                    <ReactMarkdown source={view.commonText} />
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Header as="h1">Тайные вводные роли {roleName}</Header>

                  { secretText && (
                    <ReactMarkdown source={secretText} />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button floated="right" primary>Дальше</Button>
          </Segment>
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
})(GameProcess);
