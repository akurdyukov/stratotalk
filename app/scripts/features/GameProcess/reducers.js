import immutable from 'immutability-helper';
import _ from 'lodash';

import { createReducer } from '../../modules/helpers';
import { ActionTypes } from './constants';
import { ActionTypes as CoreActionTypes } from '../../core/constants';

export const initState = {
  gameId: null, // real game id
  scenario: null, // scenario object
  game: null, // game object
  status: 'idle',
  errorMessage: '', // error message
};

export default {
  gameProcess: createReducer(initState, {
    [ActionTypes.GAME_PROCESS_ACTIVATED](state, { payload }) {
      const { gameId } = payload;

      return immutable(state, {
        gameId: { $set: gameId },
        scenario: { $set: null },
        game: { $set: null },
        errorMessage: { $set: '' },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_SUCCEEDED](state, { payload }) {
      const { scenario } = payload;
      if (state.game === undefined || state.game === null || state.game.scenarioId !== scenario.id) {
        return state;
      }

      return immutable(state, {
        scenario: { $set: scenario },
        errorMessage: { $set: '' },
        status: { $set: 'loaded' },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_FAILED](state, { payload }) {
      const { scenarioId, message } = payload;
      if (state.game !== null || state.game.scenarioId !== scenarioId) {
        return state;
      }

      return immutable(state, {
        scenario: { $set: null },
        errorMessage: { $set: message },
        status: { $set: 'error' },
      });
    },
    [CoreActionTypes.GAME_LOAD_SUCCEEDED](state, { payload }) {
      const { game } = payload;
      if (game.id !== state.gameId) {
        return state;
      }

      return immutable(state, {
        game: { $set: game },
        errorMessage: { $set: '' },
        status: { $set: 'gameLoaded' },
      });
    },
    [CoreActionTypes.GAME_LOAD_FAILED](state, { payload }) {
      const { gameId, message } = payload;
      if (gameId !== state.gameId) {
        return state;
      }

      return immutable(state, {
        game: { $set: null },
        errorMessage: { $set: message },
        status: { $set: 'error' },
      });
    },
    [CoreActionTypes.GAME_STATE_UPDATE_SUCCEEDED](state, { payload }) {
      const { game } = payload;
      if (game.id !== state.game.id) {
        return state;
      }

      return immutable(state, {
        game: { $set: game },
      });
    },
    [CoreActionTypes.GAMES_UPDATED](state, { payload }) {
      const { games } = payload;
      const game = _.find(games, (g) => g.id === state.gameId);
      return immutable(state, {
        game: { $set: game },
      });
    },
  }),
};
