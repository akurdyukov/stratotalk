import { all, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';

function* activateScenarios() {
  yield put(coreActions.scenariosLoadRequested());
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, activateScenarios),
  ]);
}

