import tinycolor from 'tinycolor2';
import {
  Color,
  ColorSettings,
  ColorShade,
  ColorShadeRecord,
  HexColor,
  getColorShades,
  toColorShadeNumber,
} from '../../types';

function generateColorShadeValue(params: {
  instance: tinycolor.Instance;
  main: ColorShade;
  shade: ColorShade;
}): HexColor {
  const { instance, main, shade } = params;

  if (main === shade) return instance.toHexString() as HexColor;

  if (shade === '00') return tinycolor('black').toHexString() as HexColor;
  if (shade === '100') return tinycolor('white').toHexString() as HexColor;

  const numericShade = toColorShadeNumber(shade);
  const numericMain = toColorShadeNumber(main);

  if (numericShade > numericMain) {
    const mixPercentage = (100 - numericShade) / (100 - numericMain);
    const mixAmount = mixPercentage * 100;
    return tinycolor
      .mix('white', instance.toHexString(), mixAmount)
      .toHexString() as HexColor;
  }

  // This is the only case left, so the if statement is unneeded.
  // Kept this here for clarity.
  // if (numericShade < numericMain)

  const mixPercentage = numericShade / numericMain;
  const mixAmount = mixPercentage * 100;
  return tinycolor
    .mix('black', instance.toHexString(), mixAmount)
    .toHexString() as HexColor;
}

function buildColor(
  params: ColorSettings & { prev?: Color }
): Omit<Color, 'id'> {
  const { name, main, prev } = params;

  const instance = tinycolor(main.color);

  if (prev) {
    if (prev.main.color === main.color && prev.main.shade === main.shade) {
      if (prev.name === name) return prev;

      return { ...prev, name };
    }

    const next = buildColor({ name, main });

    return { ...prev, ...next };
  }

  const shades: ColorShadeRecord = getColorShades().reduce<ColorShadeRecord>(
    (record, shade) => ({
      ...record,
      [shade]: generateColorShadeValue({ instance, main: main.shade, shade }),
    }),
    {} as ColorShadeRecord
  );

  return {
    name,
    main,
    ...shades,
    overrides: {},
  };
}

export default buildColor;
