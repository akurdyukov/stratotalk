// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.GAME_JOINER_ACTIVATED]: (gameId) => ({ gameId }),
  [ActionTypes.GAME_JOINER_DEACTIVATED]: undefined,
});

