import store from './_store';
import {
  closeDialog,
  openDialog,
  resetThemeMode,
  setThemeMode,
  toggleThemeMode,
} from './actions';

jest.mock('./_store.ts', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

describe('data/store/actions', () => {
  afterEach(jest.resetAllMocks);

  describe('closeDialog', () => {
    it('should dispatch action to close dialog', () => {
      // Act
      closeDialog();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'dialog/close' });
    });
  });

  describe('openDialog', () => {
    it('should dispatch action to open dialog', () => {
      // Arrange
      const dialog = { key: 'foo', data: { foo: 'test', bar: 123 } };

      // Act
      openDialog(dialog);

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'dialog/open',
        payload: dialog,
      });
    });
  });

  describe('toggleThemeMode', () => {
    it('should dispatch action to toggle light/dark mode', () => {
      // Act
      toggleThemeMode();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/mode/toggle',
      });
    });
  });

  describe('resetThemeMode', () => {
    it('should dispatch action to reset light/dark mode to user preference', () => {
      // Act
      resetThemeMode();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/mode/reset',
      });
    });
  });

  describe('setThemeMode', () => {
    it('should dispatch action to set light/dark mode to provided value', () => {
      // Act
      setThemeMode('light');

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/mode/set',
        payload: 'light',
      });
    });
  });
});
