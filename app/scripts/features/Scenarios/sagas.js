import { all, put, takeLatest, take, cancel, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import { createScenario, removeScenario, copyScenario } from '../../api/scenario';
import { ROUTE_SCENARIO_EDIT } from '../../constants/routes';

function* createSaga() {
  const user = yield select(state => state.user.user);
  try {
    const newScenario = yield call(createScenario, user);

    yield put(push(ROUTE_SCENARIO_EDIT.replace(':id', newScenario.id)));
  } catch (err) {
    // TODO: handle
  }
}

function* removeSaga(action) {
  const { id } = action.payload;
  yield call(removeScenario, id);
}

function* copySaga(action) {
  const { id } = action.payload;
  const user = yield select(state => state.user.user);
  const scenarios = yield select(state => state.scenarios.all);
  const scenario = _.find(scenarios, (item) => item.id === id);
  if (scenario === undefined) {
    return;
  }

  yield call(copyScenario, scenario, user);
}

function* activateScenarios() {
  const create = yield takeLatest(ActionTypes.SCENARIOS_CREATE, createSaga);
  const remove = yield takeLatest(ActionTypes.SCENARIOS_REMOVE, removeSaga);
  const copy = yield takeLatest(ActionTypes.SCENARIOS_COPY, copySaga);
  yield put(coreActions.scenariosLoadRequested());

  yield take(ActionTypes.SCENARIOS_DEACTIVATED);

  yield cancel(create, remove, copy);
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, activateScenarios),
  ]);
}

