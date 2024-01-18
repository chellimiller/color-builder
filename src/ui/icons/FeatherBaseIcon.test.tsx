import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FeatherBaseIcon from './FeatherBaseIcon';

describe('FeatherBaseIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<FeatherBaseIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
