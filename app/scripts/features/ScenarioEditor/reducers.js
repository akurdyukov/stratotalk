import immutable from 'immutability-helper';

import { createReducer } from '../../modules/helpers';
import { ActionTypes } from './constants';
import { ActionTypes as CoreActionTypes } from '../../core/constants';

export const initState = {
  scenarioId: null, // scenario id
  scenario: null, // scenario under edit
  errorMessage: '', // error message
  status: 'idle',
};

export default {
  scenarioEdit: createReducer(initState, {
    [ActionTypes.SCENARIO_EDIT_ACTIVATED](state, { payload }) {
      return immutable(state, {
        scenarioId: { $set: payload.scenarioId },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_STARTED](state) {
      return immutable(state, {
        scenario: { $set: null },
        errorMessage: { $set: '' },
        status: { $set: 'running' },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_SUCCEEDED](state, { payload }) {
      return immutable(state, {
        scenario: { $set: payload.scenario },
        errorMessage: { $set: '' },
        status: { $set: 'loaded' },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_FAILED](state, { payload }) {
      return immutable(state, {
        scenario: { $set: null },
        errorMessage: { $set: payload.message },
        status: { $set: 'error' },
      });
    },
    [CoreActionTypes.SCENARIO_CHANGE_SUCCEEDED](state, { payload }) {
      return immutable(state, {
        scenario: { $set: payload.scenario },
        errorMessage: { $set: '' },
      });
    },
  }),
};
