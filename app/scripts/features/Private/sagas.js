import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from './constants';
import coreActions from '../../core/actions';

function* activateMain() {
  yield put(coreActions.gamesLoadRequested());
  yield put(coreActions.scenariosLoadRequested());
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.MAIN_ACTIVATED, activateMain),
  ]);
}
