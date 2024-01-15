import { useLiveQuery } from 'dexie-react-hooks';
import { Setting } from './types';
import database from './_database';

function getSetting(key: Setting['key']): Promise<Setting | undefined> {
  return database.config.get(key);
}

export function useSetting(key: Setting['key']): Setting | undefined {
  return useLiveQuery(() => getSetting(key), [key]);
}

export function removeSetting(key: Setting['key']): Promise<void> {
  return database.config.delete(key);
}

export function setSetting(data: Setting): Promise<string> {
  return database.config.put(data, data.key);
}
