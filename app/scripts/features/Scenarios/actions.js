// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIOS_ACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_DEACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_STARTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_SUCCEEDED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_FAILED]: undefined,
});
