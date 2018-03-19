import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.MAIN_ACTIVATED]: undefined,
  [ActionTypes.MAIN_DEACTIVATED]: undefined,
  [ActionTypes.CREATE_NEW_GAME]: undefined,
  [ActionTypes.GAMES_LOAD_REQUESTED]: undefined,
  [ActionTypes.GAMES_LOAD_SUCCEEDED]: (games) => ({ games }),
  [ActionTypes.GAMES_LOAD_FAILED]: (error) => ({ error }),
  [ActionTypes.JOIN_GAME]: (game, email, role) => ({ game, email, role }),
});
