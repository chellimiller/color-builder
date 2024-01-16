import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ColorSettingsDialogView from './ColorSettingsDialogView';

describe('ColorSettingsDialogView', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<ColorSettingsDialogView />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
