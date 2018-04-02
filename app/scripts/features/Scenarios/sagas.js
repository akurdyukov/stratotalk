import { all, put, takeLatest, take, cancel, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import { createScenario, removeScenario } from '../../api/scenario';
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

function* activateScenarios() {
  const create = yield takeLatest(ActionTypes.SCENARIOS_CREATE, createSaga);
  const remove = yield takeLatest(ActionTypes.SCENARIOS_REMOVE, removeSaga);
  yield put(coreActions.scenariosLoadRequested());

  yield take(ActionTypes.SCENARIOS_DEACTIVATED);

  yield cancel(create, remove);
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.SCENARIOS_ACTIVATED, activateScenarios),
  ]);
}

