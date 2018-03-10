import React from 'react';
import { Table } from 'semantic-ui-react';

export default class Games extends React.PureComponent {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Участники</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
  }
}
