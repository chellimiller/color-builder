import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CreateIcon from './CreateIcon';

describe('CreateIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<CreateIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
