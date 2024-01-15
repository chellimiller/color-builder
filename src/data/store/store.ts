import { configureStore } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { AppState, AppAction, ThemeState, DialogState } from './types';

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialThemeState: ThemeState = {
  mode: isDarkMode() ? 'dark' : 'light',
};

// @todo This is a good choice for persistence.
function theme(
  state: ThemeState = initialThemeState,
  action: AppAction
): ThemeState {
  switch (action.type) {
    case 'theme/mode/toggle':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };
    case 'theme/mode/reset':
      return theme(state, {
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

function dialog(state: DialogState = null, action: AppAction): DialogState {
  switch (action.type) {
    case 'dialog/close':
      return null;
    case 'dialog/open':
      if (isEqual(state, action.payload)) return state;
      return action.payload;
    default:
      return state;
  }
}

const store = configureStore<AppState, AppAction>({
  reducer: {
    theme,
    dialog,
  },
});

export default store;
