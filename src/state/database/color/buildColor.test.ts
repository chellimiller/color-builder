import buildColor from './buildColor';

describe('buildColor', () => {
  it('should create a new color', () => {
    // Act
    const result = buildColor({
      name: 'example',
      main: { color: '#647d40', shade: '50' },
    });

    // Assert
    expect(result).toEqual({
      name: 'example',
      main: {
        color: '#647d40',
        shade: '50',
      },
      '00': '#000000',
      '01': '#020301',
      '03': '#060804',
      '05': '#0a0d06',
      '10': '#14190d',
      '15': '#1e2613',
      '20': '#28321a',
      '25': '#323f20',
      '30': '#3c4b26',
      '35': '#46582d',
      '40': '#506433',
      '45': '#5a713a',
      '50': '#647d40',
      '55': '#748a53',
      '60': '#839766',
      '65': '#93a479',
      '70': '#a2b18c',
      '75': '#b2bea0',
      '80': '#c1cbb3',
      '85': '#d1d8c6',
      '90': '#e0e5d9',
      '95': '#f0f2ec',
      '97': '#f6f7f4',
      '99': '#fcfcfb',
      '100': '#ffffff',
      overrides: {},
    });
  });
});
