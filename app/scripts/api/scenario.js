// @flow
import uuid from 'uuid-random';
import _ from 'lodash';

type Substitute = {
  id: string,
  text: Array<string>,
}

type Variant = {
  name: string,
  description: string,
  substitutions: Array<Substitute>,
}

type Role = {
  name: string,
  description: string,
  variants: Array<Variant>,
}

type Scenario = {
  id: string,
  name: string,
  text: string,
  substitutions: Array<Substitute>,
  roles: Array<Role>,
}

const scenarioTemplate: Scenario = {
  id: '',
  name: 'New scenario',
  text: '',
  substitutions: [
  ],
  roles: [
  ],
};

const exampleScenario: Scenario = {
  id: 'scenario1',
  name: 'Иностранная команда',
  text: `
# Описание кейса

Тут будет текст и вот постановка {{subst1}}. А еще есть постановка, зависящая от варианта 
роли: {{subst2}}.

А еще нам нужны постановки для второй роли, например {{second}}.
    
# Дополнительный текст
И тут еще текст.
    `,
  substitutions: [
    {
      id: 'subst1',
      text: ['Подставленный текст (1)', 'Подставленный текст (2)'],
    },
  ],
  roles: [
    {
      name: 'Менеджер',
      description: 'Еще надо придумать нужен ли этот текст',
      variants: [
        {
          name: 'Опытный менеджер',
          description: 'Вы опытный менеджер, уже 10 лет на посту',
          substitutions: [
            {
              id: 'subst2',
              text: ['Опытный менеджер', 'Супер-бизон'],
            },
          ],
        },
        {
          name: 'Молодой менеджер',
          description: 'Вы молодой менеджер, это ваш первый проект',
          substitutions: [
            {
              id: 'subst2',
              text: ['Молодой менеджер', 'Бывший программист'],
            },
          ],
        },
      ],
    },
    {
      name: 'Технический лидер',
      description: 'Еще надо придумать нужен ли этот текст',
      variants: [
        {
          name: 'Чувак-в-свитере',
          description: 'Опытный, бородатый и нелюдимый',
          substitutions: [
            {
              id: 'second',
              text: ['Вторая подстановка (1.1)', 'Вторая подстановка (1.2)'],
            },
          ],
        },
        {
          name: 'Хипстер на гироскутере',
          description: 'Все круто, чо?!',
          substitutions: [
            {
              id: 'second',
              text: ['Вторая подстановка (2.1)', 'Вторая подстановка (2.2)'],
            },
          ],
        },
      ],
    },
  ],
};

const knownScenarios = [exampleScenario];

export function getScenarios(): Promise<Array<Scenario>> {
  return new Promise((resolve: (any) => void) => {
    setTimeout(() => {
      resolve(knownScenarios);
    }, 1000);
  });
}

export function getScenarioById(id: string): Promise<Scenario> {
  return new Promise((resolve: (any) => void, reject: (any) => void) => {
    setTimeout(() => {
      const found = _.find(knownScenarios, (s) => s.id === id);
      if (found === undefined) {
        reject(`Unknown scenario ${id}`);
      } else {
        resolve(found);
      }
    });
  });
}

export function saveScenario(scenario: Scenario): Promise<Scenario> {
  const found = _.findIndex(knownScenarios, (s) => s.id === scenario.id);
  if (found === -1) {
    knownScenarios.push(scenario);
  } else {
    knownScenarios[found] = scenario;
  }
  // TODO: fire 'scenario updated' event
  return Promise.resolve(scenario);
}

export function createScenario(): Promise<Scenario> {
  const newScenario = { ...scenarioTemplate, id: uuid() };
  return saveScenario(newScenario);
}
