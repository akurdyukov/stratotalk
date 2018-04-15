// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIO_LOAD_REQUESTED]: (scenarioId) => ({ scenarioId }),
  [ActionTypes.SCENARIO_LOAD_STARTED]: (scenarioId) => ({ scenarioId }),
  [ActionTypes.SCENARIO_LOAD_SUCCEEDED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_LOAD_FAILED]: (scenarioId, message) => ({ scenarioId, message }),

  [ActionTypes.SCENARIOS_UPDATED]: (scenarios) => ({ scenarios }),

  [ActionTypes.SCENARIOS_LOAD_REQUESTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_STARTED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_SUCCEEDED]: undefined,
  [ActionTypes.SCENARIOS_LOAD_FAILED]: undefined,

  [ActionTypes.SCENARIO_CHANGE_REQUESTED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_SUCCEEDED]: (scenario) => ({ scenario }),
  [ActionTypes.SCENARIO_CHANGE_FAILED]: (scenario, error) => ({ scenario, error }),

  [ActionTypes.GAME_LOAD_REQUESTED]: (gameId) => ({ gameId }),
  [ActionTypes.GAME_LOAD_STARTED]: (gameId) => ({ gameId }),
  [ActionTypes.GAME_LOAD_SUCCEEDED]: (game) => ({ game }),
  [ActionTypes.GAME_LOAD_FAILED]: (gameId, message) => ({ gameId, message }),

  [ActionTypes.GAME_STATE_UPDATE_REQUESTED]: (game, state) => ({ game, state }),
  [ActionTypes.GAME_STATE_UPDATE_SUCCEEDED]: (game) => ({ game }),
  [ActionTypes.GAME_STATE_UPDATE_FAILED]: (game, message) => ({ game, message }),
});

