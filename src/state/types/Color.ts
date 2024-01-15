import { isString } from 'lodash';

export type HexColor = `#${string}`;

export interface ColorShadeRecord {
  '00': HexColor;
  '01': HexColor;
  '03': HexColor;
  '05': HexColor;
  '10': HexColor;
  '15': HexColor;
  '20': HexColor;
  '25': HexColor;
  '30': HexColor;
  '35': HexColor;
  '40': HexColor;
  '45': HexColor;
  '50': HexColor;
  '55': HexColor;
  '60': HexColor;
  '65': HexColor;
  '70': HexColor;
  '75': HexColor;
  '80': HexColor;
  '85': HexColor;
  '90': HexColor;
  '95': HexColor;
  '97': HexColor;
  '99': HexColor;
  '100': HexColor;
}

export type ColorShade = keyof ColorShadeRecord;

export interface ColorSettings {
  name: string;
  main: {
    color: string;
    shade: ColorShade;
  };
}

export interface Color extends ColorSettings, ColorShadeRecord {
  id: string;
  overrides: Partial<ColorShadeRecord>;
}

const COLOR_SHADE_VALUES: Record<ColorShade, number> = {
  '00': 0,
  '01': 1,
  '03': 3,
  '05': 5,
  '10': 10,
  '15': 15,
  '20': 20,
  '25': 25,
  '30': 30,
  '35': 35,
  '40': 40,
  '45': 45,
  '50': 50,
  '55': 55,
  '60': 60,
  '65': 65,
  '70': 70,
  '75': 75,
  '80': 80,
  '85': 85,
  '90': 90,
  '95': 95,
  '97': 97,
  '99': 99,
  '100': 100,
};

const COLOR_SHADES = (Object.keys(COLOR_SHADE_VALUES) as ColorShade[]).sort(
  (a, b) => COLOR_SHADE_VALUES[a] - COLOR_SHADE_VALUES[b]
);

/**
 * Validate that the string is a hex color.
 *
 * @todo Improve this
 */
export const isHexColor = (value: unknown): value is HexColor =>
  isString(value) && value.startsWith('#');

/**
 * Determine if the value is a valid shade.
 *
 * @param value
 * @returns
 */
export const isColorShade = (value: unknown): value is ColorShade =>
  isString(value) && Object.keys(COLOR_SHADE_VALUES).includes(value);

/**
 * Map the shade to its numeric value.
 *
 * @param value
 * @returns
 */
export const toColorShadeNumber = (shade: ColorShade): number =>
  COLOR_SHADE_VALUES[shade];

/**
 * Map the number to the color shade.
 *
 * @param value
 * @returns
 */
export const toColorShade = (value: number): ColorShade | undefined =>
  COLOR_SHADES.find((shade) => COLOR_SHADE_VALUES[shade] === value);

/** Get all color shades in order from `00` to `100` */
export const getColorShades = (): ColorShade[] => COLOR_SHADES;

/** Select the color's current `HexColor` for the given shade. */
export const selectHexColor = (color: Color, shade: ColorShade): HexColor =>
  color.overrides[shade] ?? color[shade];
