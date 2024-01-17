import { configureStore } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import {
  AppState,
  AppAction,
  ThemeState,
  DialogState,
  DialogKey,
} from './types';

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialThemeState: ThemeState = {
  mode: isDarkMode() ? 'dark' : 'light',
};

// @todo This is a good choice for persistence.
export function themeReducer(
  state: ThemeState = initialThemeState,
  action: AppAction
): ThemeState {
  switch (action.type) {
    case 'theme/mode/toggle':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };
    case 'theme/mode/reset':
      return themeReducer(state, {
        type: 'theme/mode/set',
        payload: isDarkMode() ? 'dark' : 'light',
      });
    case 'theme/mode/set': {
      if (action.payload === state.mode) return state;
      return { ...state, mode: action.payload };
    }
    default:
      return state;
  }
}

export function dialogReducer(
  state: DialogState = null,
  action: AppAction
): DialogState {
  switch (action.type) {
    case 'dialog/close':
      return null;
    case 'dialog/open':
      if (isEqual(state, action.payload)) return state;
      return action.payload;
    case 'dialog/new-color/set-name':
      if (!state || state.key !== DialogKey.NEW_COLOR) return state;
      if (state.data.name === action.payload) return state;
      return { ...state, data: { ...state.data, name: action.payload } };
    case 'dialog/new-color/set-main-color':
      if (!state || state.key !== DialogKey.NEW_COLOR) return state;
      if (state.data.main.color === action.payload) return state;
      return {
        ...state,
        data: {
          ...state.data,
          main: { ...state.data.main, color: action.payload },
        },
      };
    case 'dialog/new-color/set-main-shade':
      if (!state || state.key !== DialogKey.NEW_COLOR) return state;
      if (state.data.main.shade === action.payload) return state;
      return {
        ...state,
        data: {
          ...state.data,
          main: { ...state.data.main, shade: action.payload },
        },
      };
    default:
      return state;
  }
}

const store = configureStore<AppState, AppAction>({
  reducer: {
    theme: themeReducer,
    dialog: dialogReducer,
  },
});

export default store;
