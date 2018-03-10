import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import RawScenario from './RawScenario';
import RenderedScenario from './RenderedScenario';

export default class Scenario extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
  };

  render() {
    const { scenario } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <RawScenario scenario={scenario} />
          </Grid.Column>
          <Grid.Column>
            <RenderedScenario scenario={scenario} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

