// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.GAME_CREATOR_ACTIVATED]: undefined,
  [ActionTypes.GAME_CREATOR_DEACTIVATED]: undefined,
  [ActionTypes.SELECT_SCENARIO]: (scenario) => ({ scenario }),
  [ActionTypes.SELECT_ROLE]: (role) => ({ role }),
  [ActionTypes.CREATE_GAME]: (scenarioId, role) => ({ scenarioId, role }),
  [ActionTypes.GAME_CREATION_SUCCESS]: (game) => ({ game }),
  [ActionTypes.GAME_CREATION_FAIL]: (error) => ({ error }),
});
