import * as React from 'react';
import * as renderer from 'react-test-renderer';
import LightModeIcon from './LightModeIcon';

describe('LightModeIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<LightModeIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
