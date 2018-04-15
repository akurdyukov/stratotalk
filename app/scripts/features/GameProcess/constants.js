import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  GAME_PROCESS_ACTIVATED: undefined,
  GAME_PROCESS_DEACTIVATED: undefined,

  GAME_START_PREPARE: undefined,
  GAME_PREPARE_START_FAILED: undefined,
  GAME_START_RUN: undefined,
  GAME_START_SCORE: undefined,
});
