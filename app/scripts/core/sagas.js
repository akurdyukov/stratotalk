import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import actions from './actions';

import {
  getScenarios,
  saveScenario,
  getScenarioById,
  createChannel as createScenarioChannel } from '../api/scenario';
import {
  listActiveGames,
  getGameById,
  updateGameState,
  createChannel as createGameChannel } from '../api/game';

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

function* getScenarioSaga(action) {
  const { scenarioId } = action.payload;
  yield put(actions.scenarioLoadStarted(scenarioId));

  try {
    const response = yield call(getScenarioById, scenarioId);
    yield put(actions.scenarioLoadSucceeded(response));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.scenarioLoadFailed(scenarioId, err));
  }
}

function* updateScenario(action) {
  const { scenario } = action.payload;
  const user = yield select(state => state.user.user);
  try {
    const response = yield call(saveScenario, scenario, user);
    yield put(actions.scenarioChangeSucceeded(response));
  } catch (err) {
    yield put(actions.scenarioChangeFailed(err));
  }
}

function* getGameSaga(action) {
  const { gameId } = action.payload;

  yield put(actions.gameLoadStarted(gameId));

  try {
    const response = yield call(getGameById, gameId);
    yield put(actions.gameLoadSucceeded(response));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.gameLoadFailed(gameId, err));
  }
}

function* updateGameStateSaga(action) {
  const { game, state } = action.payload;

  // TODO: validate state transition
  const response = yield call(updateGameState, game, state);

  yield put(actions.gameStateUpdateSucceeded(response));
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
    fork(createScenarioChannel, actions.scenariosUpdated),
    takeLatest(ActionTypes.SCENARIOS_LOAD_REQUESTED, getScenariosSaga),
    takeLatest(ActionTypes.SCENARIO_LOAD_REQUESTED, getScenarioSaga),
    takeLatest(ActionTypes.SCENARIO_CHANGE_REQUESTED, updateScenario),

    fork(createGameChannel, actions.gamesUpdated),
    takeLatest(ActionTypes.GAMES_LOAD_REQUESTED, loadGames),
    takeLatest(ActionTypes.GAME_LOAD_REQUESTED, getGameSaga),
    takeLatest(ActionTypes.GAME_STATE_UPDATE_REQUESTED, updateGameStateSaga),
  ]);
}

