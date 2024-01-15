import { useCallback, useEffect, useState } from 'react';
import { Selector } from '@reduxjs/toolkit';
import { isEqual as isDeepEqual } from 'lodash';
import { AppState, EqualityChecker } from './types';
import store from './store';

function useSelector<T>(
  selector: Selector<AppState, T>,
  isEqual: EqualityChecker<T> = isDeepEqual
): T {
  const [value, setValue] = useState<T>(selector(store.getState()));

  const subscriber = useCallback(
    () =>
      setValue((prev) => {
        const next = selector(store.getState());
        if (isEqual(prev, next)) return prev;
        return next;
      }),
    [setValue, selector, isEqual]
  );

  useEffect(() => store.subscribe(subscriber), [subscriber]);

  return value;
}

const selectMode = (state: AppState) => state.theme.mode;

/**
 * Returns the color scheme for the current theme.
 *
 * @returns 'light' or 'dark'
 */
export const useMode = () => useSelector(selectMode);

const selectDialogData = (state: AppState, key: string) =>
  state.dialog?.key === key ? state.dialog.data : null;

/**
 * Returns the custom data for the dialog.
 * If the dialog is closed, the result will be null.
 *
 * @param key
 * @returns dialog data or null
 */
export function useDialogData(key: string) {
  const selector = useCallback(
    (state: AppState) => selectDialogData(state, key),
    [key]
  );
  return useSelector(selector, isDeepEqual);
}

const selectDialogIsOpen = (state: AppState, key: string) =>
  state.dialog?.key === key;

/**
 * Determines whether or not the given dialog is open.
 *
 * @param key
 * @returns {boolean}
 */
export function useDialogIsOpen(key: string) {
  const selector = useCallback(
    (state: AppState) => selectDialogIsOpen(state, key),
    [key]
  );
  return useSelector(selector, isDeepEqual);
}
