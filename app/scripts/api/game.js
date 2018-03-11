

export function createGame(scenarioId, role) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (scenarioId !== 'scenario1') {
        reject(`Unknown scenario ${scenarioId}`);
      } else {
        resolve({
          id: 'game1',
          state: 'waiting',
          scenarioId,
          roles: {
            current: role,
          },
        });
      }
    }, 0);
  });
}
