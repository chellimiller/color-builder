/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { css } from '@emotion/react';
import * as React from 'react';
import { button as styles } from '../../emotion';

/**
 * Props for the Button
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  label: string;
  hideLabel?: boolean;
}

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'ghost',
      size = 'md',
      label,
      icon,
      children = label,
      hideLabel = false,
      ...forwardedProps
    } = props;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        {...forwardedProps}
        css={css`
          ${styles.base};
          ${styles.size[size]};
          ${styles.variant[variant]};
        `}
      >
        {icon}
        {!hideLabel && <span>{children}</span>}
      </button>
    );
  }
);

export default Button;
