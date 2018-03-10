import Mustache from 'mustache';
import _ from 'lodash';

/**
 * Merge all draw substititions
 * @param {*} draw random draw
 */
function merge(draw) {
  return _.reduce(_.map(draw.roles, (role) => role.substitutions),
    (acc, value) => _.assign(acc, value),
    _.clone(draw.substitutions));
}

export default function formatScenario(scenario, draw) {
  const merged = merge(draw);
  return {
    formatted: Mustache.render(scenario.text, merge(draw)),
    merged,
  };
}
