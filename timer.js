'use strict';

const DEFAULT_LENGTHS = { work: 25, short: 5, long: 15 };
const LONG_BREAK_EVERY = 4;

function formatTime(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const minutes = String(Math.floor(s / 60)).padStart(2, '0');
  const seconds = String(s % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function nextMode(mode, completedWork) {
  if (mode !== 'work') return 'work';
  return completedWork % LONG_BREAK_EVERY === 0 ? 'long' : 'short';
}

class PomodoroTimer {
  constructor(lengths = DEFAULT_LENGTHS, now = () => Date.now()) {
    this.lengths = { ...lengths };
    this.now = now;
    this.completedWork = 0;
    this.setMode('work');
  }

  setMode(mode) {
    this.mode = mode;
    this.remaining = this.lengths[mode] * 60;
    this.endsAt = null;
  }

  get running() {
    return this.endsAt !== null;
  }

  start() {
    if (!this.running) this.endsAt = this.now() + this.remaining * 1000;
  }

  pause() {
    if (this.running) {
      this.remaining = this.timeLeft();
      this.endsAt = null;
    }
  }

  reset() {
    this.setMode(this.mode);
  }

  timeLeft() {
    if (!this.running) return this.remaining;
    return Math.max(0, (this.endsAt - this.now()) / 1000);
  }

  // Called on every tick. Returns true when a session just finished.
  tick() {
    if (!this.running || this.timeLeft() > 0) return false;
    this.finish();
    return true;
  }

  finish() {
    if (this.mode === 'work') this.completedWork += 1;
    this.setMode(nextMode(this.mode, this.completedWork));
  }
}

if (typeof module !== 'undefined') {
  module.exports = { PomodoroTimer, formatTime, nextMode, DEFAULT_LENGTHS };
}
