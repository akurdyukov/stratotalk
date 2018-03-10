import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Button } from 'semantic-ui-react';
import _ from 'lodash';

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
      <Container text>
        <Button onClick={this.handleRefresh}>Обновить</Button>
        <Header as="h2">Общие вводные</Header>
        <p>
          {view.formatted}
        </p>
        <Header as="h2">Подстановки</Header>
        <ul>
          {_.toPairs(view.merged).map((pair) => (
            <li key={pair[0]}>{pair[0]}: {pair[1]}</li>
          ))}
        </ul>
      </Container>
    );
  }
}
