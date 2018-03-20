import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import Substitutions from './Substitutions';

export default class RawScenario extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
  };

  render() {
    const { scenario } = this.props;

    return (
      <Container text>
        <Header as="h2">{scenario.name} ({scenario.id})</Header>

        <p>{scenario.text}</p>
        <Header as="h3">Общие подстановки</Header>
        <ul>
          {scenario.substitutions.map((sub) => (
            <Substitutions sub={sub} key={sub.id} />
          ))}
        </ul>

        <Header as="h3">Роли</Header>
        <ul>
          {scenario.roles.map((role) => (
            <li key={role.name}>
              {role.name}: {role.description}
              <ul>
                {role.variants.map((variant) => (
                  <li key={variant.name}>
                    {variant.name}: {variant.description}
                    <ul>
                      {variant.substitutions.map((sub) => (
                        <Substitutions sub={sub} key={`${variant.name}-${sub.id}`} />
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}

