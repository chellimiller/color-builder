import * as React from 'react';
import * as renderer from 'react-test-renderer';
import AllColorsView from './AllColorsView';

describe('AllColorsView', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<AllColorsView />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
