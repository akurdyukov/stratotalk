import immutable from 'immutability-helper';
import { createReducer } from '../../modules/helpers';

import { ActionTypes } from './constants';

export const initState = {
  games: [], // list of games
  activeGame: null, // current active game
  errorMessage: null, // string
};

export default {
  main: createReducer(initState, {
    [ActionTypes.GAMES_LOAD_SUCCEEDED](state, { payload }) {
      const { games } = payload;
      return immutable(state, {
        games: { $set: games },
        activeGame: { $set: null },
        errorMessage: { $set: null },
      });
    },
    [ActionTypes.GAMES_LOAD_FAILED](state, { payload }) {
      const { error } = payload;
      return immutable(state, {
        games: { $set: [] },
        activeGame: { $set: null },
        errorMessage: { $set: error },
      });
    },
  }),
};
