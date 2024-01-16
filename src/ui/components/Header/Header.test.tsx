import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<Header />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
