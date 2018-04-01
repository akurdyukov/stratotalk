import React from 'react';
import PropTypes from 'prop-types';
import Form from '@naveego/react-jsonschema-form-semantic';
import { TextArea } from 'semantic-ui-react';
import './ScenarioEditor.scss';
import { schema } from './schema';

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

