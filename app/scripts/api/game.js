// @flow
import uuid from 'uuid-random';
import _ from 'lodash';
import moment from 'moment';
import { call, put, take } from 'redux-saga/effects';

import type { Scenario } from './scenario';

import makeDraw from './generator';
import rsf from './rsf';

type State = 'BOARDING' | 'CANCELLED' | 'WAITING' | 'PREPARING' | 'RUNNING' | 'SCORING' | 'FINISHED';

type Role = string;

type DesiredRole = string | null; // null means no particular role selected

type EmailToRole = { [email: string]: Role };

type Game = {
  id: string,
  state: State,
  scenarioId: string,
  roles: EmailToRole,
  draw: any,
};

const activeGames: Array<Game> = [
  {
    id: 'savedGame1',
    state: 'BOARDING',
    scenarioId: 'scenario1',
    roles: {
      'akurdyukov@gmail.com': 'ПМ',
    },
    draw: {
      substitutions: {
        'Срок работы ПМ': 'всего месяц как',
        Страна: 'Индии',
        Ситуация: 'В начале проекта команда была обрадована таким сотрудничеством, так как не хватало рабочих рук, но последнее время в коллективе витают панические настроения.',
        'Подозрения ПМ': 'ПМ подозревает, что это из-за того, что вся интересная работа была отдана другой команде, так как  в общем чате он видел обсуждение по поводу того, что “нам почему-то только рутину скинули" (возможно, данная гипотеза неверна, и поведение объясняется другими мотивами).',
      },
      roles: {
        ПМ: {
          variant: {
            name: 'ПМ Вариант',
            description: 'Типология по DISC: {{Типология по DISC}}.  ',
          },
          substitutions: {
            'Типология по DISC': 'зелено-синий',
          },
        },
        'Технический лидер': {
          variant: {
            name: 'Технический лидер вариант',
            description: 'Типология по DISC: {{Типология по DISC}}.  \n\nПричина поведения: {{Причина поведения тех лида}}.\n\nВаша мотивация: {{Мотивация тех лида}}.\n\nВаша дополнительная цель: {{Цель тех лида}}.',
          },
          substitutions: {
            'Цель тех лида': 'явный недостаток тестирования на проекте',
            'Типология по DISC': 'желто-зеленый',
            'Причина поведения тех лида': ' не хочет - саботирует работу, чтобы общие результаты показали неправильность принятого решения',
            'Мотивация тех лида': 'свобода - свободный распорядок дня (сейчас надо сидеть с 9 до 18)',
          },
        },
      },
    },
  },
];

const COLLECTION = 'games';

export function* save(game: Game): Saga<Game> {
  const ref = `${COLLECTION}/${game.id}`;
  yield call(rsf.firestore.setDocument, ref, game);
  return game;
}

/**
 * Create new game and join it
 */
export function* createGame(scenario: Scenario, email: string, role: DesiredRole): Saga<Game> {
  const game: Game = {
    id: uuid(),
    state: 'BOARDING',
    scenarioId: scenario.id,
    roles: {
      [email]: role,
    },
    draw: makeDraw(scenario),
  };

  return yield save(game);
}

export function* listActiveGames(): Saga<Array<Game>> {
  const snapshot = yield call(rsf.firestore.getCollection, COLLECTION);
  return snapshot.docs.map((item) => item.data());
}

export function* getGameById(id: string): Saga<Game> {
  const ref = `${COLLECTION}/${id}`;
  const doc = yield call(rsf.firestore.getDocument, ref);
  if (doc.exists) {
    return doc.data();
  }
  return null;
}

export function* updateGameState(game: Game, state: State): Saga<Game> {
  const updated = { ...game, state };
  return yield save(updated);
}

export function* remove(id: string): Saga<Void> {
  const ref = `${COLLECTION}/${id}`;
  yield call(rsf.firestore.deleteDocument, ref);
}

export function* createChannel(updateGames): Saga<Void> {
  const channel = rsf.firestore.channel(COLLECTION);

  while (true) {
    const updates = yield take(channel);
    yield put(updateGames(updates.docs.map((item) => item.data())));
  }
}

export function joinGame(gameId: string, email: string, role: DesiredRole): Promise<Game> {
  return new Promise((resolve, reject) => {
    listActiveGames().then((games) => {
      // find the game
      const game = _.find(games, g => g.id === gameId);
      if (!game) {
        reject(`Game ${gameId} not found.`);
        return;
      }
      // check is user already joined
      const currentRole = _.findKey(game.roles, k => k === email);
      if (currentRole) {
        reject(`User ${email} already joined`);
        return;
      }
      // check role is not occupied already
      if (role !== null) {
        const foundRole = _.find(game.roles, (v) => v === role);
        if (foundRole !== undefined) {
          reject(`Role ${role} already occupied`);
          return;
        }
      }
      // do add
      game.roles[email] = role;
      // TODO: save
    }).catch((err) => reject(err));
  });
}
