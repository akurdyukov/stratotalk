import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import actions from './actions';
import coreActions from '../../core/actions';

import { listActiveGames } from '../../api/game';

function* activateMain() {
  // separate action is case of moving this somewhere else
  yield put(actions.gamesLoadRequested());
  yield put(coreActions.scenariosLoadRequested());
}

function* loadGames() {
  try {
    const games = yield call(listActiveGames);
    yield put(actions.gamesLoadSucceeded(games));
  } catch (err) {
    yield put(actions.gamesLoadFailed(err));
  }
}


export default function* root() {
  yield all([
    takeLatest(ActionTypes.MAIN_ACTIVATED, activateMain),
    takeLatest(ActionTypes.GAMES_LOAD_REQUESTED, loadGames),
  ]);
}

