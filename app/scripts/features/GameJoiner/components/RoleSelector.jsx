import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

import { ROLE_WATCHER } from '../../../constants/roles';

export default class RoleSelector extends React.PureComponent {
    static propTypes = {
      roles: PropTypes.array, // array of role names
      selectedRole: PropTypes.string, // role name
      selectRole: PropTypes.func.isRequired, // action to select a role
      usedRoles: PropTypes.array, // list of occupied roles of scenario
    }

    handleChange = (e, { value }) => {
      const v = value === '' ? null : value;
      this.props.selectRole(v);
    }

    render() {
      return (
        <Form loading={this.props.roles === null}>
          <Form.Field key="$norole$">
            <Radio
              label="Все равно"
              name="roleGroup"
              value=""
              checked={this.props.selectedRole === null}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field key="$watcher$">
            <Radio
              label="Хочу только наблюдать"
              name="roleGroup"
              value={ROLE_WATCHER}
              checked={this.props.selectedRole === ROLE_WATCHER}
              onChange={this.handleChange}
            />
          </Form.Field>
          {this.props.roles && this.props.roles.map((r) => (
            <Form.Field key={r.name}>
              <Radio
                label={r.name}
                name="roleGroup"
                value={r.name}
                disabled={this.props.usedRoles !== null && this.props.usedRoles.includes(r.name)}
                checked={this.props.selectedRole === r.name}
                onChange={this.handleChange}
              />
            </Form.Field>
          ))}
        </Form>
      );
    }
}
