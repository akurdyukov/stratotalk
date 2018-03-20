// @flow
import uuid from 'uuid-random';
import _ from 'lodash';
import moment from 'moment';

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
};

const activeGames: Array<Game> = [
  {
    id: 'savedGame1',
    state: 'BOARDING',
    scenarioId: 'scenario1',
    roles: {
      'akurdyukov@gmail.com': 'Менеджер',
    },
    startDate: moment().add(10, 'seconds'),
  },
];

/**
 * Create new game and join it
 * 
 * @param {*} scenarioId 
 * @param {*} email 
 * @param {*} role 
 */
export function createGame(scenarioId: string, email: string, role: DesiredRole): Promise<Game> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // TODO: check no active game for current user
      if (scenarioId !== 'scenario1') {
        reject(`Unknown scenario ${scenarioId}`);
      } else {
        const newGame: Game = {
          id: uuid(),
          state: 'BOARDING',
          scenarioId,
          roles: {
            email: role,
          },
          startDate: moment().add(10, 'seconds'),
        };
        activeGames.push(newGame);

        resolve(newGame);
      }
    }, 0);
  });
}

export function listActiveGames(): Promise<Array<Game>> {
  return new Promise((resolve) => {
    resolve(activeGames);
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
