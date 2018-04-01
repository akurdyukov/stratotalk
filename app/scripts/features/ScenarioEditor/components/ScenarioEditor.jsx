import React from 'react';
import PropTypes from 'prop-types';
import Form from '@naveego/react-jsonschema-form-semantic';
import { TextArea } from 'semantic-ui-react';
import './ScenarioEditor.scss';

const schema = {
  title: 'Scenario editor',
  type: 'object',
  required: ['id', 'name', 'text'],
  properties: {
    id: { type: 'string', title: 'Идентификатор', default: 'Уникальный идентификатор.' },
    name: { type: 'string', title: 'Название', default: 'Новое название сценария.' },
    text: { type: 'string', title: 'Описание кейса', default: '' },
    substitutions: {
      type: 'array',
      title: 'Общие подстановки',
      items: {
        $ref: '#/definitions/Substitution',
      },
    },
    roles: {
      type: 'array',
      title: 'Роли',
      items: {
        type: 'object',
        required: ['name', 'description', 'variants'],
        properties: {
          name: { type: 'string', title: 'Название роли' },
          description: { type: 'string', title: 'Описание роли' },
          variants: {
            type: 'array',
            title: 'Варианты',
            items: {
              $ref: '#/definitions/Variant',
            },
          },
        },
      },
    },
  },
  definitions: {
    Variant: {
      type: 'object',
      title: 'Вариант',
      required: ['name', 'description', 'substitutions'],
      properties: {
        name: { type: 'string', title: 'Название варианта' },
        description: { type: 'string', title: 'Тайный текст для варианта' },
        substitutions: {
          type: 'array',
          title: 'Подстановки',
          items: {
            $ref: '#/definitions/Substitution',
          },
        },

      },
    },
    Substitution: {
      type: 'object',
      required: ['id', 'text'],
      properties: {
        id: { type: 'string', title: 'ID Постановки', default: 'Уникальный идентификатор.' },
        text: {
          type: 'array',
          title: 'Тексты',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

const uiSchema = {
  id: {
    'ui:readonly': true,
  },
  name: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
  },
  text: {
    'ui:widget': (props) => (
      <TextArea 
        autoHeight
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="codeeditor"
      />
    ),
  },
  substitutions: {
    classNames: 'wide',
  },
  roles: {
    items: {
      variants: {
        items: {
          description: {
            'ui:widget': (props) => (
              <TextArea 
                autoHeight
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                className="codeeditor"
              />
            ),
          },
        },
      },
    },
  },
};

export default class ScenarioEditor extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    scenario: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={this.props.scenario}
        onChange={(e) => { this.props.onChange(e.formData); }}
        onSubmit={(e) => { this.props.onChange(e.formData); }}
      />
    );
  }
}

