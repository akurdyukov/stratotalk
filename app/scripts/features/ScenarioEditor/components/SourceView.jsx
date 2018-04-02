import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { Message } from 'semantic-ui-react';
import Ajv from 'ajv';
import _ from 'lodash';

import { schema } from './schema';

const options = {
  lineNumbers: true,
  mode: 'javascript',
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

export default class SourceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: JSON.stringify(this.props.scenario, null, 2),
      error: null,
    };
  }

  static propTypes = {
    scenario: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  updateCode = (value) => {
    this.setState({
      code: value,
    });
    try {
      const parsed = JSON.parse(value);

      // validate schema
      const valid = validate(parsed);
      if (!valid) {
        this.setState({
          error: validate.errors.map((error) => error.message),
        });
        return;
      }

      // clear error
      this.setState({
        error: null,
      });

      // send updated value
      this.props.onChange(parsed);
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  getMessage = () => {
    if (_.isArray(this.state.error)) {
      return (
        <div>
          {
            this.state.error.map((err) => (
              <p key={err}>{err}</p>
            ))
          }
        </div>
      );
    }
    return (
      <p>{this.state.error}</p>
    );
  }

  render() {
    return (
      <div>
        {this.state.error !== null && (
          <Message negative>
            {this.getMessage()}
          </Message>
        )}
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
}
