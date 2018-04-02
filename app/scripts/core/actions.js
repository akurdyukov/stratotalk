// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIO_LOAD_REQUESTED]: (scenarioId) => ({ scenarioId }),
  [ActionTypes.SCENARIO_LOAD_STARTED]: (scenarioId) => ({ scenarioId }),
  [ActionTypes.SCENARIO_LOAD_SUCCEEDED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_LOAD_FAILED]: (scenarioId, error) => ({ scenarioId, error }),

  [ActionTypes.SCENARIOS_UPDATED]: (scenarios) => ({ scenarios }),

  [ActionTypes.SCENARIOS_LOAD_REQUESTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_STARTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_SUCCEEDED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_FAILED]: undefined,

  [ActionTypes.SCENARIO_CHANGE_REQUESTED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_SUCCEEDED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_FAILED]: (scenario, error) => ({ scenario, error }),
});

