import * as React from 'react';

/**
 * Props for the Button
 */
export type ButtonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return <div {...forwardedProps} />;
}

export default Button;
