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

const timer = new PomodoroTimer(loadLengths());
const clock = document.getElementById('clock');
const toggle = document.getElementById('toggle');
const sessions = document.getElementById('sessions');
const modeButtons = document.querySelectorAll('.modes button');

function render() {
  const left = formatTime(timer.timeLeft());
  clock.textContent = left;
  document.title = `${left} · ${timer.mode === 'work' ? 'Focus' : 'Break'}`;
  toggle.textContent = timer.running ? 'Pause' : 'Start';
  sessions.textContent = `Session ${timer.completedWork + 1}`;
  document.body.style.setProperty('--accent', ACCENTS[timer.mode]);
  modeButtons.forEach((b) => b.classList.toggle('active', b.dataset.mode === timer.mode));
}
