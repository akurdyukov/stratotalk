import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Button, List, Segment, Label, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import makeDraw from '../../../api/generator';
import formatScenario from '../../../api/formatter';

export default class RenderedScenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: makeDraw(props.scenario),
    };
  }

  static propTypes = {
    scenario: PropTypes.object.isRequired,
  }

  handleRefresh = () => {
    this.setState({
      draw: makeDraw(this.props.scenario),
    });
  }

  render() {
    const view = formatScenario(this.props.scenario, this.state.draw);
    return (
      <Container fluid>
        <Button primary onClick={this.handleRefresh}>
          <Icon name="refresh" />
          Обновить
        </Button>
        <Header as="h2">Общие вводные</Header>

        <Segment>
          <ReactMarkdown source={view.commonText} />
        </Segment>

        <Header as="h2">Тайные вводные</Header>
        <List>
          {_.toPairs(view.secretTexts).map(([roleName, secretText]) => (
            <List.Item key={roleName}>
              <List.Content>
                <List.Header>{roleName}</List.Header>
                <List.Description>
                  <Segment>
                    <ReactMarkdown source={secretText} />
                  </Segment>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Header as="h2">Подстановки</Header>
        <List divided selection>
          {_.toPairs(view.merged).map((pair) => (
            <List.Item key={pair[0]}>
              <Label>{pair[0]}</Label>
              {pair[1]}
            </List.Item>
          ))}
        </List>
      </Container>
    );
  }
}
