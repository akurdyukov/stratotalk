import framework from '../framework/reducers';
import main from '../features/Private/reducers';
import scenarios from '../features/Scenarios/reducers';
import scenarioEditor from '../features/ScenarioEditor/reducers';
import gameCreator from '../features/GameCreator/reducers';

export default {
  ...framework,
  ...main,
  ...scenarios,
  ...scenarioEditor,
  ...gameCreator,
};
