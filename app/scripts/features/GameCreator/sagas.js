import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ActionTypes } from './constants';
import actions from './actions';
import coreActions from '../../core/actions';

import { createGame } from '../../api/game';

import { ROUTE_PRIVATE } from '../../constants/routes';

function* activateGameCreator() {
  yield put(coreActions.scenariosLoadRequested());
}

function* createGameSaga(action) {
  const { scenario, role } = action.payload;
  const email = yield select(state => state.user.user.email);
  try {
    const game = yield call(createGame, scenario, email, role);
    yield put(actions.gameCreationSuccess(game));
    yield put(push(ROUTE_PRIVATE)); // go to games list
  } catch (err) {
    yield put(actions.gameCreationFail(err));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GAME_CREATOR_ACTIVATED, activateGameCreator),
    takeLatest(ActionTypes.CREATE_GAME, createGameSaga),
  ]);
}

