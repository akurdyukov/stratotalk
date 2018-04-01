import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';
import coreActions from '../../core/actions';
import Scenario from './components/Scenario';


class ScenarioEditor extends React.PureComponent {
  static propTypes = {
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    scenario: PropTypes.object,
    scenarioChanged: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  activateEditor = () => {
    this.props.activate(this.props.match.params.id);
  }

  render() {
    const isLoading = this.props.status === 'running';
    return (
      <Feature onActivate={this.activateEditor} onDeactivate={this.props.deactivate}>
        <AppHeader location={this.props.location} />
        <Segment loading={isLoading}>
          <Header as="h1">Сценарий</Header>

          {this.props.scenario !== null && (
            <Scenario
              scenario={this.props.scenario}
              scenarioChanged={this.props.scenarioChanged}
            />
          )}
        </Segment>
      </Feature>
    );
  }
}

const mapStateToProps = (state) => ({
  scenario: state.scenarioEdit.scenario,
  status: state.scenarioEdit.status,
});

export default connect(mapStateToProps, {
  activate: actions.scenarioEditActivated,
  deactivate: actions.scenarioEditDeactivated,
  scenarioChanged: coreActions.scenarioChangeRequested,
})(ScenarioEditor);
