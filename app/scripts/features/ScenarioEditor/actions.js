// @flow

import { createActions } from 'redux-actions';

import { ActionTypes } from './constants';

export default createActions({
  [ActionTypes.SCENARIO_EDIT_ACTIVATED]: (scenarioId) => ({ scenarioId }),
  [ActionTypes.SCENARIO_EDIT_DEACTIVATED]: undefined,
});

