'use strict';

const DEFAULT_LENGTHS = { work: 25, short: 5, long: 15 };
const LONG_BREAK_EVERY = 4;

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const minutes = String(Math.floor(s / 60)).padStart(2, '0');
  const seconds = String(s % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}
