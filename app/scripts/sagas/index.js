import { all, fork } from 'redux-saga/effects';

import framework from '../framework/sagas';
import main from '../features/Private/sagas';
import scenarios from '../features/Scenarios/sagas';
import gameCreator from '../features/GameCreator/sagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(framework),
    fork(main),
    fork(scenarios),
    fork(gameCreator),
  ]);
}
