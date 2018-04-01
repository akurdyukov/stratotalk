import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, List } from 'semantic-ui-react';

import AppHeader from '../../components/Header';
import Feature from '../../components/Feature';

import actions from './actions';
import ScenarioItem from './components/ScenarioItem';

class Scenarios extends React.PureComponent {
  static propTypes = {
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    scenarios: PropTypes.object.isRequired,
  };

  render() {
    const isLoading = this.props.scenarios.status === 'running';
    return (
      <Feature onActivate={this.props.activate} onDeactivate={this.props.deactivate}>
        <AppHeader location={this.props.location} />
        <Segment loading={isLoading}>
          <Header as="h1">Сценарии</Header>
          <List>
            {this.props.scenarios.all.map((scenario) => (
              <ScenarioItem scenario={scenario} key={scenario.id} />
            ))}
          </List>
        </Segment>
      </Feature>
    );
  }
}

const mapStateToProps = (state) => ({
  scenarios: state.scenarios,
});

export default connect(mapStateToProps, {
  activate: actions.scenariosActivated,
  deactivate: actions.scenariosDeactivated,
})(Scenarios);
