import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Main from './Main';

describe('Main', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<Main />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
