import { Action, PayloadAction } from '@reduxjs/toolkit';

export type EqualityChecker<T> = (a: T, b: T) => boolean;

// This could be modified to be a union type for stricter type validation.
export type DialogState = null | {
  key: string;
  data: Record<string, unknown>;
};

export type DialogAction =
  | Action<'dialog/close'>
  | PayloadAction<Exclude<DialogState, null>, 'dialog/open'>;

export interface ThemeState {
  mode: 'light' | 'dark';
}

export type ThemeAction =
  | Action<'theme/mode/toggle'>
  | Action<'theme/mode/reset'>
  | PayloadAction<ThemeState['mode'], 'theme/mode/set'>;

export type AppState = {
  theme: ThemeState;
  dialog: DialogState;
};

export type AppAction = ThemeAction | DialogAction;
