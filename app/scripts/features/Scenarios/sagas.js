import { all, call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import actions from './actions';

import { getScenarios, saveScenario } from '../../api/scenario';

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

function* updateScenario(action) {
  const { scenario } = action.payload;
  try {
    const response = yield call(saveScenario, scenario);
    yield put(actions.scenarioChangeSucceeded(response));
  } catch (err) {
    yield put(actions.scenarioChangeFailed(err));
  }
}

function* activateScenarios() {
  yield put(actions.scenariosLoadRequested());
  const update = yield takeLatest(ActionTypes.SCENARIO_CHANGE_REQUESTED, updateScenario);

  // wait deactivation
  yield take(ActionTypes.SCENARIOS_DEACTIVATED);

  // deactivate
  yield cancel(update);
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, activateScenarios),
    takeLatest(ActionTypes.SCENARIOS_LOAD_REQUESTED, getScenariosSaga),
  ]);
}

