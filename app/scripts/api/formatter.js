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

function renderText(text, subst) {
  // TODO: add MarkDown here
  return Mustache.render(text, subst);
}

function getSecretTexts(draw) {
  return _.map(_.toPairs(draw.roles), ([roleName, roleDraw]) => [roleName, renderText(roleDraw.variant.description)]);
}

export default function formatScenario(scenario, draw) {
  const merged = merge(draw);
  return {
    commonText: renderText(scenario.text, merged),
    secretTexts: _.fromPairs(getSecretTexts(draw)),
    merged,
  };
}
