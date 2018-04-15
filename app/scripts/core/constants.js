import keyMirror from 'fbjs/lib/keyMirror';

export const ActionTypes = keyMirror({
  SCENARIOS_LOAD_REQUESTED: undefined,
  SCENARIOS_LOAD_STARTED: undefined,
  SCENARIOS_LOAD_SUCCEEDED: undefined,
  SCENARIOS_LOAD_FAILED: undefined,

  SCENARIOS_UPDATED: undefined,

  SCENARIO_LOAD_REQUESTED: undefined,
  SCENARIO_LOAD_STARTED: undefined,
  SCENARIO_LOAD_SUCCEEDED: undefined,
  SCENARIO_LOAD_FAILED: undefined,

  SCENARIO_CHANGE_REQUESTED: undefined,
  SCENARIO_CHANGE_SUCCEEDED: undefined,
  SCENARIO_CHANGE_FAILED: undefined,

  GAME_LOAD_REQUESTED: undefined,
  GAME_LOAD_STARTED: undefined,
  GAME_LOAD_SUCCEEDED: undefined,
  GAME_LOAD_FAILED: undefined,

  GAME_STATE_UPDATE_REQUESTED: undefined,
  GAME_STATE_UPDATE_SUCCEEDED: undefined,
  GAME_STATE_UPDATE_FAILED: undefined,
});

