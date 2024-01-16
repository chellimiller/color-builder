import * as React from 'react';

/**
 * Props for the FormField
 */
export type FormFieldProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const FormField: React.FC<FormFieldProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return <div {...forwardedProps} />;
}

export default FormField;
