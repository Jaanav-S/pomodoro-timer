'use strict';

const STORAGE_KEY = 'pomodoro.lengths';
const ACCENTS = { work: 'var(--work)', short: 'var(--short)', long: 'var(--long)' };

function loadLengths() {
  try {
    return { ...DEFAULT_LENGTHS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_LENGTHS };
  }
}
