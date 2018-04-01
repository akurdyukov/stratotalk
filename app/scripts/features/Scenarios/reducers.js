import immutable from 'immutability-helper';
import _ from 'lodash';

import { createReducer } from '../../modules/helpers';
import { ActionTypes } from '../../core/constants';

export const initState = {
  all: [],
  errorMessage: '', // error message
  status: 'idle',
};

function updateScenario(updated) {
  return (scenarios) => {
    const index = _.findIndex(scenarios, (s) => s.id === updated.id);
    const copy = _.cloneDeep(scenarios);
    copy[index] = updated;
    return copy;
  };
}

export default {
  scenarios: createReducer(initState, {
    [ActionTypes.SCENARIOS_LOAD_STARTED](state) {
      return immutable(state, {
        all: { $set: [] },
        errorMessage: { $set: '' },
        status: { $set: 'running' },
      });
    },
    [ActionTypes.SCENARIOS_LOAD_SUCCEEDED](state, { payload }) {
      return immutable(state, {
        all: { $set: payload },
        status: { $set: 'loaded' },
      });
    },
    [ActionTypes.SCENARIOS_LOAD_FAILED](state, { payload }) {
      return immutable(state, {
        errorMessage: { $set: payload.message },
        status: { $set: 'error' },
      });
    },
    [ActionTypes.SCENARIO_CHANGE_SUCCEEDED](state, { payload }) {
      return immutable(state, {
        all: { $apply: updateScenario(payload.scenario) },
      });
    },
  }),
};
