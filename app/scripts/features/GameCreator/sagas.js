import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ActionTypes } from './constants';
import actions from './actions';
import scenActions from '../Scenarios/actions';

import { createGame } from '../../api/game';

import { ROUTE_PRIVATE } from '../../constants/routes';

function* activateGameCreator() {
  yield put(scenActions.scenariosLoadRequested());
}

function* createGameSaga(action) {
  const { scenarioId, role } = action.payload;
  try {
    const game = yield call(createGame, scenarioId, role);
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

