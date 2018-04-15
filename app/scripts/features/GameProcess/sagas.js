import { all, put, takeLatest, select } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';
import actions from './actions';
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

function* startPrepareSaga() {
  const game = yield select(state => state.gameProcess.game);

  if (game === null) {
    return;
  }

  if (game.state !== 'BOARDING') {
    yield put(actions.gamePrepareStartFailed('Invalid game state'));
  } else {
    yield put(coreActions.gameStateUpdateRequested(game, 'PREPARING'));
  }
}

function* startRunSaga() {
  const game = yield select(state => state.gameProcess.game);

  if (game === null) {
    return;
  }

  if (game.state !== 'PREPARING') {
    yield put(actions.gamePrepareStartFailed('Invalid game state'));
  } else {
    yield put(coreActions.gameStateUpdateRequested(game, 'RUNNING'));
  }
}

function* startScoreSaga() {
  const game = yield select(state => state.gameProcess.game);

  if (game === null) {
    return;
  }

  if (game.state !== 'RUNNING') {
    yield put(actions.gamePrepareStartFailed('Invalid game state'));
  } else {
    yield put(coreActions.gameStateUpdateRequested(game, 'SCORING'));
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GAME_PROCESS_ACTIVATED, activateSaga),
    takeLatest(CoreActionTypes.GAME_LOAD_SUCCEEDED, loadScenarioSaga),

    takeLatest(ActionTypes.GAME_START_PREPARE, startPrepareSaga),
    takeLatest(ActionTypes.GAME_START_RUN, startRunSaga),
    takeLatest(ActionTypes.GAME_START_SCORE, startScoreSaga),
  ]);
}
