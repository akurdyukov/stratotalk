import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    copy: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    scenario: PropTypes.object.isRequired,
  }

  render() {
    const dest = ROUTE_SCENARIO_EDIT.replace(':id', this.props.scenario.id);

    return (
      <List.Item>
        <List.Content floated="right">
          <Button size="mini" onClick={() => this.props.copy(this.props.scenario.id)}>Копировать</Button>
          <Button size="mini" negative onClick={() => this.props.remove(this.props.scenario.id)}>Удалить</Button>
        </List.Content>

        <List.Icon name="comments" size="large" verticalAlign="middle" />

        <List.Content>
          <List.Header><Link to={dest}>{this.props.scenario.name}</Link></List.Header>
          <List.Description>{shorten(this.props.scenario.text, 50)}</List.Description>
          <List.Description>
            Последнее обновление
            &nbsp;<a href={`mailto:${this.props.scenario.modifiedBy.email}`}><b>{this.props.scenario.modifiedBy.name}</b></a>&nbsp;
            {moment(this.props.scenario.modifiedAt).fromNow()}.
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}
