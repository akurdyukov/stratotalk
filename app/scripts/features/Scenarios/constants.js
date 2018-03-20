import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  SCENARIOS_ACTIVATED: undefined,
  SCENARIOS_DEACTIVATED: undefined,

  // TODO: move scenarios load to other feature or repository
  SCENARIOS_LOAD_REQUESTED: undefined,
  SCENARIOS_LOAD_STARTED: undefined,
  SCENARIOS_LOAD_SUCCEEDED: undefined,
  SCENARIOS_LOAD_FAILED: undefined,

  SCENARIO_CHANGE_REQUESTED: undefined,
  SCENARIO_CHANGE_SUCCEEDED: undefined,
  SCENARIO_CHANGE_FAILED: undefined,
});

