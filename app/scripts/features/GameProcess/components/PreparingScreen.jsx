import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Button, Segment } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import formatScenario from '../../../api/formatter';

export default class PreparingScreen extends React.PureComponent {
  static propTypes = {
    currentEmail: PropTypes.string.isRequired,
    game: PropTypes.object, // is null on first load
    nextAction: PropTypes.func.isRequired,
    scenario: PropTypes.object, // is null on first load
  }

  render() {
    const view = (this.props.scenario !== null && this.props.game !== null) ?
      formatScenario(this.props.scenario, this.props.game.draw) : null;
    const roleName = this.props.game !== null ? this.props.game.roles[this.props.currentEmail] : null;
    const secretText = view !== null ? view.secretTexts[roleName] : null;

    return (
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
        <Button floated="right" primary onClick={() => this.props.nextAction()}>Дальше</Button>
      </Segment>
    );
  }
}
