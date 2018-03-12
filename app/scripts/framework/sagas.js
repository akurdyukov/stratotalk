/**
 * @module Sagas/User
 * @desc User
 */
import firebase from 'firebase';
import { all, call, put, takeLatest, fork, take } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import actions from './actions';

import rsf from '../api/rsf';

const authProvider = new firebase.auth.GoogleAuthProvider();

/**
 * Login
 */
export function* login() {
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
export function* logout() {
  try {
    const data = yield call(rsf.auth.signOut);
    yield put(actions.userLogoutSuccess(data));
  } catch (err) {
    /* istanbul ignore next */
    yield put(actions.userLogoutFailure(err));
  }
}

function * syncUserSaga() {
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

/**
 * User Sagas
 */
export default function* root() {
  yield fork(syncUserSaga);
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logout),
  ]);
}
