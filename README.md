# Pomodoro timer

A no-build, no-dependency Pomodoro timer. Open `index.html` in a browser.

## How it works

Work for 25 minutes, take a 5 minute break, and after every fourth work
session take a longer 15 minute break. The page title shows the time left
so you can keep an eye on it from another tab.

## Keyboard shortcuts

| Key   | Action        |
|-------|---------------|
| Space | Start / pause |
| R     | Reset         |
| S     | Skip session  |

## Settings

Session lengths can be changed in the settings panel and are remembered
in `localStorage`.

## Project layout

- `timer.js`: timer state machine with no DOM code, easy to test
- `app.js`: wires the timer to the page
