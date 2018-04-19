import { all, put, takeLatest, select, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import { ActionTypes as CoreActionTypes } from '../../core/constants';

import { save } from '../../api/game';

import { ROUTE_GAME_PROCESS } from '../../constants/routes';

function* activateSaga(action) {
  const { gameId } = action.payload;
  // load game
  yield put(coreActions.gameLoadRequested(gameId));
}

function* loadScenarioSaga(action) {
  const { game } = action.payload;

  const gameId = yield select(state => state.gameJoiner.gameId);
  if (game.id === gameId) {
    // this is my game, need to load
    yield put(coreActions.scenarioLoadRequested(game.scenarioId));
  }
}

function* joinGameSaga(action) {
  const { game, email, role } = action.payload;
  game.roles[email] = role;

  yield call(save, game);

  yield put(push(ROUTE_GAME_PROCESS.replace(':id', game.id)));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GAME_JOINER_ACTIVATED, activateSaga),
    takeLatest(CoreActionTypes.GAME_LOAD_SUCCEEDED, loadScenarioSaga),
    takeLatest(ActionTypes.GAME_JOINER_JOIN_GAME, joinGameSaga),
  ]);
}
