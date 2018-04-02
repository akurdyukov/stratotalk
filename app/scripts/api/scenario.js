// @flow
import uuid from 'uuid-random';
import { call, put, take } from 'redux-saga/effects';
import _ from 'lodash';

import rsf from './rsf';

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
  createdBy: string,
  createdAt: Date,
  modifiedBy: string,
  modifiedAt: Date,
}

type User = {
  email: string,
  displayName: string,
}

const scenarioTemplate: Scenario = {
  id: '',
  name: 'New scenario',
  text: '',
  substitutions: [
  ],
  roles: [
  ],
  createdBy: '',
  createdAt: new Date(),
  modifiedBy: '',
  modifiedAt: new Date(),
};

const exampleScenario: Scenario = {
  id: 'scenario1',
  name: '[Пример, не удалять] Иностранная команда',
  createdBy: '',
  createdAt: new Date(),
  modifiedBy: '',
  modifiedAt: new Date(),
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

export function* migrateDatabase(user: User): Saga<Void> {
  const ref = `scenarios/${exampleScenario.id}`;
  const example = yield call(rsf.firestore.getDocument, ref);
  if (!example.exists) {
    const updated = {
      ...exampleScenario,
      createdBy: {
        email: user.email,
        name: user.displayName,
      },
      modifiedBy: {
        email: user.email,
        name: user.displayName,
      },
    };
    yield call(rsf.firestore.setDocument, ref, updated);
  }
}

export function* getScenarios(): Saga<Void> {
  const snapshot = yield call(rsf.firestore.getCollection, 'scenarios');
  return snapshot.docs.map((item) => item.data());
}

export function* getScenarioById(id: string): Saga<Scenario> {
  const ref = `scenarios/${id}`;
  const doc = yield call(rsf.firestore.getDocument, ref);
  if (doc.exists) {
    return doc.data();
  }
  return null;
}

export function* saveScenario(scenario: Scenario, user: User): Saga<Scenario> {
  const ref = `scenarios/${scenario.id}`;
  // TODO: set 'updated'
  const updated = {
    ...scenario,
    modifiedBy: {
      email: user.email,
      name: user.displayName,
    },
  };
  const doc = yield call(rsf.firestore.setDocument, ref, updated);
  return doc.data();
}

export function* createScenario(user: User): Saga<Scenario> {
  const newScenario = { ...scenarioTemplate, id: uuid() };
  return yield saveScenario(newScenario, user);
}

export function* createChannel(updateScenarios): Saga<Void> {
  const channel = rsf.firestore.channel('scenarios');

  while (true) {
    const updates = yield take(channel);
    yield put(updateScenarios(updates.docs.map((item) => item.data())));
  }
}

export function* removeScenario(id: string): Saga<Void> {
  const ref = `scenarios/${id}`;
  yield call(rsf.firestore.deleteDocument, ref);
}
