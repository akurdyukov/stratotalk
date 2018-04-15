import { all, fork } from 'redux-saga/effects';

import framework from '../framework/sagas';
import core from '../core/sagas';
import main from '../features/Private/sagas';
import scenarios from '../features/Scenarios/sagas';
import scenarioEditor from '../features/ScenarioEditor/sagas';
import gameCreator from '../features/GameCreator/sagas';
import gameProcess from '../features/GameProcess/sagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(framework),
    fork(core),
    fork(main),
    fork(scenarios),
    fork(scenarioEditor),
    fork(gameCreator),
    fork(gameProcess),
  ]);
}
