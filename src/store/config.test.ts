import { useLiveQuery } from 'dexie-react-hooks';
import database from './_database';
import { useSetting, removeSetting, setSetting } from './config';
import { Setting } from './types';

jest.mock('./_database.ts', () => ({
  __esModule: true,
  default: {
    config: {
      delete: jest.fn().mockReturnValue(Promise.resolve()),
      get: jest
        .fn()
        .mockImplementation((key) =>
          Promise.resolve({ key, name: key, value: key })
        ),
      put: jest.fn().mockImplementation((_data, key) => Promise.resolve(key)),
    },
  },
}));

jest.mock('dexie-react-hooks', () => ({
  useLiveQuery: jest.fn().mockImplementation((promise) => promise()),
}));

describe('store/config', () => {
  describe('useSetting', () => {
    it('should use useLiveQuery with a query to database.config.get', () => {
      // Arrange
      const key = 'foo-bar';

      // Act
      useSetting(key);

      // Assert
      expect(database.config.get).toHaveBeenCalledWith(key);
      expect(useLiveQuery).toHaveBeenCalled();
    });
  });

  describe('removeSetting', () => {
    it('should call database.config.delete', async () => {
      // Arrange
      const key = 'foo-bar';

      // Act
      await removeSetting(key);

      // Assert
      expect(database.config.delete).toHaveBeenCalledWith(key);
    });
  });

  describe('setSetting', () => {
    it('should call database.config.put', async () => {
      // Arrange
      const key = 'foo-bar';
      const setting: Setting = {
        key,
        name: 'Foo Bar',
        value: true,
      };

      // Act
      await setSetting(setting);

      // Assert
      expect(database.config.put).toHaveBeenCalledWith(setting, key);
    });
  });
});
