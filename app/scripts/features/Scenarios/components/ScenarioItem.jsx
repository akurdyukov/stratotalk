import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ROUTE_SCENARIO_EDIT } from '../../../constants/routes';

function shorten(str, len, ellipsis = '…') {
  if (str.length <= len) {
    return str;
  }

  let result = str.substr(0, len - 1);
  result = result.substr(0, Math.min(result.length, result.lastIndexOf(' ')));

  return result + ellipsis;
}

export default class ScenarioItem extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
  }

  render() {
    const dest = ROUTE_SCENARIO_EDIT.replace(':id', this.props.scenario.id);

    return (
      <List.Item>
        <List.Icon name="comments" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header><Link to={dest}>{this.props.scenario.name}</Link></List.Header>
          <List.Description>{shorten(this.props.scenario.text, 50)}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}
