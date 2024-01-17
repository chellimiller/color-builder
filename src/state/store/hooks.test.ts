import { renderHook } from '@testing-library/react';
import { useDialogData, useDialogIsOpen, useThemeMode } from './hooks';
import {
  closeDialog,
  openDialog,
  setThemeMode,
  toggleThemeMode,
} from './actions';
import { DialogKey } from './types';
import { ColorSettings } from '../types';

describe('data/store/hooks', () => {
  afterEach(jest.resetAllMocks);

  describe('useThemeMode', () => {
    it('should return current theme mode', () => {
      // Arrange
      setThemeMode('light');

      // Act
      const { result, rerender } = renderHook(() => useThemeMode());

      // Assert
      expect(result.current).toBe('light');

      // Act
      toggleThemeMode();
      rerender();

      // Assert
      expect(result.current).toBe('dark');

      // Teardown
      setThemeMode('light');
    });
  });

  describe('useDialogIsOpen', () => {
    it('should return whether specified dialog is currently open', () => {
      // Arrange
      const key = DialogKey.NEW_COLOR;
      const data: ColorSettings = {
        name: '',
        main: { color: 'red', shade: '40' },
      };

      // Act
      const { result, rerender } = renderHook(() => useDialogIsOpen(key));

      // Assert
      expect(result.current).toBe(false);

      // Act
      openDialog({ key, data });
      rerender();

      // Assert
      expect(result.current).toBe(true);

      // Teardown
      closeDialog();
    });
  });

  describe('useDialogData', () => {
    it('should return specified dialog data', () => {
      // Arrange
      const key = DialogKey.NEW_COLOR;
      const data: ColorSettings = {
        name: '',
        main: { color: 'red', shade: '40' },
      };
      const next: ColorSettings = {
        name: 'hi',
        main: { color: 'red', shade: '40' },
      };

      // Act
      const { result, rerender } = renderHook(() => useDialogData(key));
      expect(result.current).toBeNull();

      // Act
      openDialog({ key, data });
      rerender();

      // Assert
      expect(result.current).toEqual(data);

      // Change data to new value
      openDialog({ key, data: next });
      rerender();
      expect(result.current).toBe(next);

      // Verify data remains unchanged when given equivalent data.
      openDialog({ key, data: { ...next } });
      rerender();
      expect(result.current).toBe(next);

      // Teardown
      closeDialog();
    });
  });
});
