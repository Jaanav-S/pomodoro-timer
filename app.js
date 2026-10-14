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

function saveLengths(lengths) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lengths));
  } catch {
    // Storage can be unavailable in private windows; settings just will not persist.
  }
}
