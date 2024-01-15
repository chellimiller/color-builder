/**
 * Example entity stored in Dexie.
 */
export type Entity = {
  id: string;
  name: string;
};

/**
 * Example app configuration setting stored in Dexie.
 */
export type Setting = {
  key: string;
  name: string;
  value: string | boolean | number;
};
