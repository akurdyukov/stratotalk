import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';
import _ from 'lodash';

export default class ScenarioSelector extends React.PureComponent {
    static propTypes = {
      scenarios: PropTypes.object.isRequired,
      selectedScenario: PropTypes.object,
      selectScenario: PropTypes.func.isRequired,
    }

    handleChange = (e, { value }) => {
      const scenario = _.find(this.props.scenarios.all, (s) => s.id === value);
      this.props.selectScenario(scenario);
    }

    render() {
      const { all, status } = this.props.scenarios;
      const isLoading = status === 'running';

      return (
        <Form loading={isLoading}>
          {!isLoading && all.map((s) => (
            <Form.Field key={s.id}>
              <Radio
                label={s.name}
                name="scenarioGroup"
                value={s.id}
                checked={this.props.selectedScenario && this.props.selectedScenario.id === s.id}
                onChange={this.handleChange}
              />
            </Form.Field>
          ))}
        </Form>
      );
    }
}
