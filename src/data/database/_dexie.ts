import Dexie, { Table } from 'dexie';
import { Entity } from './types';

class DexieDatabase extends Dexie {
  entities!: Table<Entity, Entity['id']>;

  constructor() {
    super('color-builder');
    this.version(1).stores({
      entities: '++id',
    });
  }
}

const database = new DexieDatabase();

export default database;
