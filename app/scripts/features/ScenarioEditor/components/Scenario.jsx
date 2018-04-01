import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tab } from 'semantic-ui-react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { idea } from 'react-syntax-highlighter/styles/hljs';

import RawScenario from './RawScenario';
import RenderedScenario from './RenderedScenario';
import ScenarioEditor from './ScenarioEditor';

export default class Scenario extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
    scenarioChanged: PropTypes.func.isRequired,
  };

  getViewer = () => {
    const { scenario } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <RawScenario scenario={scenario} scenarioChanged={this.props.scenarioChanged} />
          </Grid.Column>
          <Grid.Column>
            <RenderedScenario scenario={scenario} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  getEditor = () => (
    <ScenarioEditor
      scenario={this.props.scenario}
      onChange={this.props.scenarioChanged}
    />
  )

  getSourceView = () => {
    return (
      <SyntaxHighlighter language="json" style={idea} showLineNumbers>
        {JSON.stringify(this.props.scenario, null, 2)}
      </SyntaxHighlighter>
    );
  }

  render() {
    const panes = [
      { menuItem: 'Просмотр', render: () => <Tab.Pane>{this.getViewer()}</Tab.Pane> },
      { menuItem: 'Редактирование', render: () => <Tab.Pane>{this.getEditor()}</Tab.Pane> },
      { menuItem: 'Исходник', render: () => <Tab.Pane>{this.getSourceView()}</Tab.Pane> },
    ];

    return (
      <Tab panes={panes} />
    );
  }
}

