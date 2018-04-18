import immutable from 'immutability-helper';
import { createReducer } from '../../modules/helpers';

import { ActionTypes as CoreActionTypes } from '../../core/constants';

export const initState = {
  games: [], // list of games
  activeGame: null, // current active game
  errorMessage: null, // string
};

export default {
  main: createReducer(initState, {
    [CoreActionTypes.GAMES_LOAD_SUCCEEDED](state, { payload }) {
      const { games } = payload;
      return immutable(state, {
        games: { $set: games },
        activeGame: { $set: null },
        errorMessage: { $set: null },
      });
    },
    [CoreActionTypes.GAMES_UPDATED](state, { payload }) {
      const { games } = payload;
      return immutable(state, {
        games: { $set: games },
        activeGame: { $set: null },
        errorMessage: { $set: null },
      });
    },
    [CoreActionTypes.GAMES_LOAD_FAILED](state, { payload }) {
      const { error } = payload;
      return immutable(state, {
        games: { $set: [] },
        activeGame: { $set: null },
        errorMessage: { $set: error },
      });
    },
  }),
};
