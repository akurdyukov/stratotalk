// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.GAME_PROCESS_ACTIVATED]: (gameId) => ({ gameId }),
  [ActionTypes.GAME_PROCESS_DEACTIVATED]: undefined,

  [ActionTypes.GAME_START_PREPARE]: undefined,
  [ActionTypes.GAME_PREPARE_START_FAILED]: (message) => ({ message }),
  [ActionTypes.GAME_START_RUN]: undefined,
  [ActionTypes.GAME_START_SCORE]: undefined,
});

