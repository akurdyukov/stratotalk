import framework from '../framework/reducers';
import scenarios from '../features/Scenarios/reducers';
import gameCreator from '../features/GameCreator/reducers';

export default {
  ...framework,
  ...scenarios,
  ...gameCreator,
};
