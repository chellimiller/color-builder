import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ColorSwatchIcon from './ColorSwatchIcon';

describe('ColorSwatchIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<ColorSwatchIcon color="foo" />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
