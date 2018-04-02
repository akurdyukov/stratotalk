/**
 * @module Sagas/User
 * @desc User
 */
import firebase from 'firebase';
import { all, call, put, takeLatest, fork, take, select } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';

import { ActionTypes } from './constants';
import actions from './actions';

import rsf from '../api/rsf';
import { migrateDatabase } from '../api/scenario';

const authProvider = new firebase.auth.GoogleAuthProvider();

/**
 * Login
 */
function* login() {
  try {
    const data = yield call(rsf.auth.signInWithPopup, authProvider);

    yield put(actions.userLoginSuccess(data));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.userLoginFailure(err));
  }
}

/**
 * Logout
 */
function* logout() {
  try {
    const data = yield call(rsf.auth.signOut);
    yield put(actions.userLogoutSuccess(data));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.userLogoutFailure(err));
  }
}

function* syncUserSaga() {
  const channel = yield call(rsf.auth.channel);

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      yield put(actions.syncUser(user));
    } else {
      yield put(actions.syncUser(null));
    }
  }
}

function* migrationSaga() {
  const user = yield select(state => state.user.user);
  yield call(migrateDatabase, user);
}

/**
 * User Sagas
 */
export default function* root() {
  yield fork(syncUserSaga);
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logout),
    takeLatest(REHYDRATE, migrationSaga),
  ]);
}
