import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ColorSettings, ColorShade } from '../types';

export type EqualityChecker<T> = (a: T, b: T) => boolean;

export enum DialogKey {
  NEW_COLOR = 'new-color',
}

// This could be modified to be a union type for stricter type validation.
export type DialogState = null | {
  key: DialogKey.NEW_COLOR;
  data: ColorSettings;
};

export type DialogAction =
  | Action<'dialog/close'>
  | PayloadAction<Exclude<DialogState, null>, 'dialog/open'>
  | PayloadAction<string, 'dialog/new-color/set-name'>
  | PayloadAction<string, 'dialog/new-color/set-main-color'>
  | PayloadAction<ColorShade, 'dialog/new-color/set-main-shade'>;

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
