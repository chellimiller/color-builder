import * as React from 'react';
import { render } from '@testing-library/react';
import SvgIcon from './SvgIcon';

describe('App', () => {
  it('should match snapshot', () => {
    // Act
    const result = render(<SvgIcon />);

    // Assert
    expect(result.container.firstElementChild?.getAttribute('viewBox')).toBe(
      '0 0 24 24'
    );
  });
});
