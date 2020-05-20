export const GAMES = {
  PATH_OF_EXILE: 'Path of Exile',
  MANUAL: 'Manual',
  LOTTERY: 'Lottery',
  GODS_UNCHAINED: 'Gods Unchained',
  YOUR_GAME: 'Your Game',
};
export const winningConditionTypes = {
  LEVEL: 'level',
  CHALLENGES: 'challenges',
};
export const LEVELS = [...Array(100 + 1).keys()].splice(1);
export const CHALLENGES = [...Array(40 + 1).keys()];
export const LEAGUES = {
  STANDARD: 'Standard',
  HARDCORE: 'Hardcore',
  DELIRIUM: 'Delirium',
  DELIRIUM_HC: 'Delirium Hardcore',
};