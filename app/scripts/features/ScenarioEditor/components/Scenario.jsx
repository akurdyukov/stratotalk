import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import ErrorBoundary from 'react-error-boundary';

import RawScenario from './RawScenario';
import RenderedScenario from './RenderedScenario';
import ScenarioEditor from './ScenarioEditor';
import SourceView from './SourceView';

const FallbackComponent = ({ componentStack, error }) => (
  <div/>
);

export default class Scenario extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
    scenarioChanged: PropTypes.func.isRequired,
  };

  getStructure = () => (
    <RawScenario scenario={this.props.scenario} scenarioChanged={this.props.scenarioChanged} />
  )

  getPreviewer = () => (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <RenderedScenario scenario={this.props.scenario} />
    </ErrorBoundary>
  )

  getEditor = () => (
    <ScenarioEditor
      scenario={this.props.scenario}
      onChange={this.props.scenarioChanged}
    />
  )

  getSourceView = () => (
    <SourceView scenario={this.props.scenario} onChange={this.props.scenarioChanged} />
  )

  render() {
    const panes = [
      { menuItem: 'ПредПросмотр', render: () => <Tab.Pane>{this.getPreviewer()}</Tab.Pane> },
      { menuItem: 'Структура', render: () => <Tab.Pane>{this.getStructure()}</Tab.Pane> },
      { menuItem: 'Редактирование', render: () => <Tab.Pane>{this.getEditor()}</Tab.Pane> },
      { menuItem: 'Исходник', render: () => <Tab.Pane>{this.getSourceView()}</Tab.Pane> },
    ];

    return (
      <Tab panes={panes} />
    );
  }
}

