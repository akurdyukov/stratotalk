import moment from 'moment';

export function getSecondsLeft(game, state) {
  if (game === null || game === undefined) {
    return null;
  }
  if (game.stateStarts === undefined) {
    return null;
  }
  const startTime = game.stateStarts[state];
  if (startTime === undefined) {
    return null;
  }
  const shouldFinish = moment(startTime).add(10, 'minutes');
  return shouldFinish.diff(moment(), 'seconds');
}
