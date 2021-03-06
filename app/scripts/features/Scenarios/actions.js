// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIOS_ACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_DEACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_CREATE]: undefined,
  [ActionTypes.SCENARIOS_COPY]: (id) => ({ id }),
  [ActionTypes.SCENARIOS_REMOVE]: (id) => ({ id }),
});

