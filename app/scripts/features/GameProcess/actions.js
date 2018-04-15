// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.GAME_PROCESS_ACTIVATED]: (gameId) => ({ gameId }),
  [ActionTypes.GAME_PROCESS_DEACTIVATED]: undefined,
});
