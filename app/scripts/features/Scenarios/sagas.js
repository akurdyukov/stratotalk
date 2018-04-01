import { all, put, takeLatest, take, cancel, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import { createScenario } from '../../api/scenario';
import { ROUTE_SCENARIO_EDIT } from '../../constants/routes';

function* createSaga() {
  try {
    const newScenario = yield call(createScenario);

    yield put(push(ROUTE_SCENARIO_EDIT.replace(':id', newScenario.id)));
  } catch (err) {
    // TODO: handle
  }
}

function* activateScenarios() {
  const create = yield takeLatest(ActionTypes.SCENARIOS_CREATE, createSaga);
  yield put(coreActions.scenariosLoadRequested());

  yield take(ActionTypes.SCENARIOS_DEACTIVATED);

  yield cancel(create);
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, activateScenarios),
  ]);
}

