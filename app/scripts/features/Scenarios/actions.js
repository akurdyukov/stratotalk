// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIOS_ACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_DEACTIVATED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_REQUESTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_STARTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_SUCCEEDED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_FAILED]: undefined,
  [ActionTypes.SCENARIO_CHANGE_REQUESTED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_SUCCEEDED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_FAILED]: (scenario, error) => ({ scenario, error }),
});

