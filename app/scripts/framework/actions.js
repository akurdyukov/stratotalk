import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.USER_LOGIN_REQUEST]: undefined,
  [ActionTypes.USER_LOGIN_SUCCESS]: (data) => ({ data }),
  [ActionTypes.USER_LOGIN_FAILURE]: (error) => ({ error }),
  [ActionTypes.USER_LOGOUT_REQUEST]: undefined,
  [ActionTypes.USER_LOGOUT_SUCCESS]: undefined,
  [ActionTypes.USER_LOGOUT_FAILURE]: undefined,
  [ActionTypes.SYNC_USER]: (user) => ({ user }),
});
