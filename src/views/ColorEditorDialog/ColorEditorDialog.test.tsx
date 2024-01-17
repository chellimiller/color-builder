import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ColorEditorDialog from './ColorEditorDialog';

describe('ColorEditorDialog', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<ColorEditorDialog />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
