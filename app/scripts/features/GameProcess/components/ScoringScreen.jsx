import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Segment, Icon } from 'semantic-ui-react';

export default class ScoringScreen extends React.PureComponent {
  static propTypes = {
    game: PropTypes.object, // is null on first load
    nextAction: PropTypes.func.isRequired,
    scenario: PropTypes.object, // is null on first load
  }

  render() {
    const loading = (this.props.game === null || this.props.scenario === null);
    return (
      <Segment loading={loading}>
        { this.props.scenario && (
          <Header icon textAlign="center">
            <Icon name="signal" circular />
            <Header.Content>
              Оцениваем переговоры
            </Header.Content>
          </Header>
        )}
        <Button floated="right" primary onClick={() => this.props.nextAction()}>Дальше</Button>
      </Segment>
    );
  }
}
