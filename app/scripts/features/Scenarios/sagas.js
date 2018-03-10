import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import actions from './actions';

import { getScenarios } from '../../api/scenario';

function* getScenariosSaga() {
  const status = yield select(state => state.scenarios.status);
  if (status === 'loaded') {
    // stop on loaded
    return;
  }
  yield put(actions.scenariosLoadStarted());

  try {
    const response = yield call(getScenarios);
    yield put(actions.scenariosLoadSucceeded(response));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.scenariosLoadFailed(err));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, getScenariosSaga),
  ]);
}

