import { all, put, takeLatest, select } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import { ActionTypes as CoreActionTypes } from '../../core/constants';

function* activateSaga(action) {
  const { gameId } = action.payload;
  // load game
  yield put(coreActions.gameLoadRequested(gameId));
}

function* loadScenarioSaga(action) {
  const { game } = action.payload;

  const gameId = yield select(state => state.gameProcess.gameId);
  if (game.id === gameId) {
    // this is my game, need to load
    yield put(coreActions.scenarioLoadRequested(game.scenarioId));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GAME_PROCESS_ACTIVATED, activateSaga),
    takeLatest(CoreActionTypes.GAME_LOAD_SUCCEEDED, loadScenarioSaga),
  ]);
}
