import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DarkModeIcon from './DarkModeIcon';

describe('DarkModeIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<DarkModeIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
