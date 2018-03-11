import immutable from 'immutability-helper';
import { createReducer } from '../../modules/helpers';

import { ActionTypes } from './constants';

export const initState = {
  scenario: null, // scenario object
  roles: null, // list of role objects
  role: null, // string
  errorMessage: null, // string
};

export default {
  gameCreator: createReducer(initState, {
    [ActionTypes.GAME_CREATOR_ACTIVATED](state) {
      return immutable(state, {
        scenario: { $set: null },
        roles: { $set: null },
        role: { $set: null },
        errorMessage: { $set: null },
      });
    },
    [ActionTypes.SELECT_SCENARIO](state, { payload }) {
      const { scenario } = payload;
      return immutable(state, {
        scenario: { $set: scenario },
        roles: { $set: scenario.roles },
        role: { $set: null },
      });
    },
    [ActionTypes.SELECT_ROLE](state, { payload }) {
      const { role } = payload;
      return immutable(state, {
        role: { $set: role },
      });
    },
    [ActionTypes.GAME_CREATION_FAIL](state, { payload }) {
      const { error } = payload;
      return immutable(state, {
        errorMessage: { $set: error },
      });
    },
  }),
};
