import Dexie, { Table } from 'dexie';
import { Color } from '../types';

class DexieDatabase extends Dexie {
  colors!: Table<Color, Color['id']>;

  constructor() {
    super('color-builder');
    this.version(1).stores({
      colors: '++id',
    });
  }
}

const database = new DexieDatabase();

export default database;
