import Dexie, { Table } from 'dexie';
import { Entity, Setting } from './types';

class DexieDatabase extends Dexie {
  config!: Table<Setting, Setting['key']>;

  entities!: Table<Entity, Entity['id']>;

  constructor() {
    super('template-react-app-prototype');
    this.version(1).stores({
      config: '++key',
      entities: '++id',
    });
  }
}

const database = new DexieDatabase();

export default database;
