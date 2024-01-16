import * as React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

interface ColorSwatchIconProps
  extends Omit<SvgIconProps, 'color' | 'children'> {
  shape?: 'circle' | 'square';
  color: string;
  contrast?: string;
}

const ColorSwatchIcon: React.FC<ColorSwatchIconProps> = React.forwardRef<
  SVGSVGElement,
  ColorSwatchIconProps
>((props, ref) => {
  const { color, contrast, shape = 'circle', ...forwardedProps } = props;

  const gradientId = React.useId();

  if (!color) return <SvgIcon {...forwardedProps} ref={ref} />;

  if (!contrast) {
    return (
      <SvgIcon {...forwardedProps} ref={ref}>
        {shape === 'circle' && <circle cx="12" cy="12" r="12" fill={color} />}
        {shape === 'square' && <rect width="100%" height="100%" fill={color} />}
      </SvgIcon>
    );
  }

  return (
    <SvgIcon {...forwardedProps} ref={ref}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: color }} />
          <stop offset="50%" style={{ stopColor: color }} />
          <stop offset="50%" style={{ stopColor: contrast }} />
          <stop offset="100%" style={{ stopColor: contrast }} />
        </linearGradient>
      </defs>
      {shape === 'circle' && (
        <circle cx="12" cy="12" r="12" fill={`url(#${gradientId})`} />
      )}
      {shape === 'square' && (
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      )}
    </SvgIcon>
  );
});

export default ColorSwatchIcon;
