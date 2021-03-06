import immutable from 'immutability-helper';
import { createReducer } from '../../modules/helpers';

import { ActionTypes } from './constants';
import { ActionTypes as CoreActionTypes } from '../../core/constants';

export const initState = {
  gameId: null, // real game id
  scenario: null, // scenario object
  game: null, // game object
  status: 'idle',
  errorMessage: '', // error message
  selectedRole: null, // selected role
};

export default {
  gameJoiner: createReducer(initState, {
    [ActionTypes.GAME_JOINER_ACTIVATED](state, { payload }) {
      const { gameId } = payload;

      return immutable(state, {
        gameId: { $set: gameId },
        scenario: { $set: null },
        game: { $set: null },
        errorMessage: { $set: '' },
        selectedRole: { $set: null },
      });
    },
    [ActionTypes.GAME_JOINER_SELECT_ROLE](state, { payload }) {
      const { role } = payload;
      return immutable(state, {
        selectedRole: { $set: role },
      });
    },
    [CoreActionTypes.SCENARIO_LOAD_SUCCEEDED](state, { payload }) {
      const { scenario } = payload;
      if (state.game === null || state.game.scenarioId !== scenario.id) {
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
  }),
};
