import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FormField from './FormField';

describe('FormField', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<FormField />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
