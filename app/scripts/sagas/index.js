import { all, fork } from 'redux-saga/effects';

import user from '../framework/sagas';
import scenarios from '../features/Scenarios/sagas';
import gameCreator from '../features/GameCreator/sagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(user),
    fork(scenarios),
    fork(gameCreator),
  ]);
}
