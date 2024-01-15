/* eslint-disable no-bitwise */

import { Opaque } from 'type-fest';

export type UUID = Opaque<string, 'uuid'>;

/**
 * Generates a random UUID.
 * Imperfect but good enough for a prototype app.
 *
 * @returns
 */
function generateUUID(): UUID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  ) as UUID;
}

export default generateUUID;
