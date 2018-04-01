import { all, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';

function* activateScenarioEditor(action) {
  const { scenarioId } = action.payload;
  yield put(coreActions.scenarioLoadRequested(scenarioId));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIO_EDIT_ACTIVATED, activateScenarioEditor),
  ]);
}

