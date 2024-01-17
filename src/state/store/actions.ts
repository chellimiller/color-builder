// Actions are bound to the store to avoid Redux-specific concerns outside the module.

import { ColorShade } from '../types';
import store from './_store';
import { DialogKey, DialogState, ThemeState } from './types';

export function closeDialog(): void {
  store.dispatch({ type: 'dialog/close' });
}

export function openDialog(payload: Exclude<DialogState, null>): void {
  store.dispatch({ type: 'dialog/open', payload });
}

export function openCreateColorDialog(): void {
  return openDialog({
    key: DialogKey.NEW_COLOR,
    data: {
      name: '',
      main: {
        color: '#647d40',
        shade: '50',
      },
    },
  });
}

export function setNewColorName(value: string): void {
  store.dispatch({ type: 'dialog/new-color/set-name', payload: value });
}

export function setNewColorMainColor(value: string): void {
  store.dispatch({ type: 'dialog/new-color/set-main-color', payload: value });
}

export function setNewColorMainShade(value: ColorShade): void {
  store.dispatch({ type: 'dialog/new-color/set-main-shade', payload: value });
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
