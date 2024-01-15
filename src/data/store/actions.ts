// Actions are bound to the store to avoid Redux-specific concerns outside the module.

import store from './store';
import { DialogState, ThemeState } from './types';

export function closeDialog(): void {
  store.dispatch({ type: 'dialog/close' });
}

export function openDialog(payload: Exclude<DialogState, null>): void {
  store.dispatch({ type: 'dialog/open', payload });
}

export function toggleThemeMode(): void {
  store.dispatch({ type: 'theme/mode/toggle' });
}

export function resetThemeMode(): void {
  store.dispatch({ type: 'theme/mode/reset' });
}

export function setThemeMode(mode: ThemeState['mode']): void {
  store.dispatch({ type: 'theme/mode/set', payload: mode });
}
