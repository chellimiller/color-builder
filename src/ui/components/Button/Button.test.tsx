import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<Button />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
