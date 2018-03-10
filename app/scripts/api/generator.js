import _ from 'lodash';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomSubstitutions(substitutions) {
  const pairs = substitutions.map((sub) => [sub.id, sub.text[getRandomInt(sub.text.length)]]);
  return _.fromPairs(pairs);
}

function getRandomVariant(variants) {
  const variant = variants[getRandomInt(variants.length)];
  const s = getRandomSubstitutions(variant.substitutions);
  return {
    variant: {
      name: variant.name,
      description: variant.description,
    },
    substitutions: s,
  };
}

/**
 * Makes a random draw o the scenario
 *
 * @param {Scenario} scenario to process
 */
export default function makeDraw(scenario) {
  const rolePairs = scenario.roles.map((role) => [role.name, getRandomVariant(role.variants)]);
  return {
    substitutions: getRandomSubstitutions(scenario.substitutions),
    roles: _.fromPairs(rolePairs),
  };
}
