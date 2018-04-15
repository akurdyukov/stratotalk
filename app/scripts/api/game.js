// @flow
import uuid from 'uuid-random';
import _ from 'lodash';
import moment from 'moment';
import type { Scenario } from './scenario';
import makeDraw from './generator';

type State = 'BOARDING' | 'CANCELLED' | 'WAITING' | 'RUNNING' | 'SCORING' | 'FINISHED';

type Role = string;

type DesiredRole = string | null; // null means no particular role selected

type EmailToRole = { [email: string]: Role };

type Game = {
  id: string,
  state: State,
  scenarioId: string,
  roles: EmailToRole,
  startTime: moment,
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
    startDate: moment().add(10, 'seconds'),
    draw: { 
      substitutions: { 
        'Срок работы ПМ': 'всего месяц как', 
        'Страна': 'Индии', 
        'Ситуация': 'В начале проекта команда была обрадована таким сотрудничеством, так как не хватало рабочих рук, но последнее время в коллективе витают панические настроения.', 
        'Подозрения ПМ': 'ПМ подозревает, что это из-за того, что вся интересная работа была отдана другой команде, так как  в общем чате он видел обсуждение по поводу того, что “нам почему-то только рутину скинули" (возможно, данная гипотеза неверна, и поведение объясняется другими мотивами).' 
      }, 
      roles: { 
        'ПМ': { 
          'variant': { 
            'name': 'ПМ Вариант', 
            'description': 'Типология по DISC: {{Типология по DISC}}.  ' 
          }, 
          'substitutions': { 
            'Типология по DISC': 'зелено-синий' 
          } 
        }, 
        'Технический лидер': { 
          variant: { 
            name: 'Технический лидер вариант', 
            description: 'Типология по DISC: {{Типология по DISC}}.  \n\nПричина поведения: {{Причина поведения тех лида}}.\n\nВаша мотивация: {{Мотивация тех лида}}.\n\nВаша дополнительная цель: {{Цель тех лида}}.' 
          }, 
          substitutions: { 
            'Цель тех лида': 'явный недостаток тестирования на проекте', 
            'Типология по DISC': 'желто-зеленый',
            'Причина поведения тех лида': ' не хочет - саботирует работу, чтобы общие результаты показали неправильность принятого решения',
            'Мотивация тех лида': 'свобода - свободный распорядок дня (сейчас надо сидеть с 9 до 18)'
          }
        }
      }
    },
  },
];

/**
 * Create new game and join it
 */
export function createGame(scenario: Scenario, email: string, role: DesiredRole): Promise<Game> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: check no active game for current user
      const newGame: Game = {
        id: uuid(),
        state: 'BOARDING',
        scenarioId: scenario.id,
        roles: {
          [email]: role,
        },
        startDate: moment().add(10, 'seconds'),
        draw: makeDraw(scenario),
      };
      activeGames.push(newGame);

      resolve(newGame);
    }, 0);
  });
}

export function listActiveGames(): Promise<Array<Game>> {
  return new Promise((resolve) => {
    resolve(activeGames);
  });
}

export function getGameById(gameId: string): Promise<Game> {
  return new Promise((resolve, reject) => {
    listActiveGames().then((games) => {
      const game = _.find(games, (g) => (g.id === gameId));
      if (game !== undefined) {
        resolve(game);
      } else {
        reject(`Game ${gameId} not found`);
      }
    }).catch((err) => {
      reject(err);
    });
  });
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
