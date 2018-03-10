// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants';

export default createActions({
  [ActionTypes.USER_LOGIN_REQUEST]: undefined,
  [ActionTypes.USER_LOGOUT_REQUEST]: undefined,
});
