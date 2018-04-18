import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.MAIN_ACTIVATED]: undefined,
  [ActionTypes.MAIN_DEACTIVATED]: undefined,
});
