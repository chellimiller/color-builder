import * as React from 'react';
import * as renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('should match snapshot', () => {
    // Act
    const tree = renderer.create(<App />).toJSON();

    // Assert
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="app"
      >
        <h1>
          Hello World
        </h1>
      </div>
    `);
  });
});
