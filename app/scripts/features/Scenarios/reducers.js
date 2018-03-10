import immutable from 'immutability-helper';
import { createReducer } from '../../modules/helpers';

import { ActionTypes } from './constants';

export const initState = {
  all: [],
  errorMessage: '', // error message
  status: 'idle',
};

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
  }),
};
