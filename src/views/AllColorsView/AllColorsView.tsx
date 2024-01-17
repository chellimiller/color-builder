import * as React from 'react';
import { useAllColors } from '../../state';

/**
 * Props for the AllColorsView component.
 */
export type AllColorsViewProps = React.HTMLAttributes<HTMLElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const AllColorsView: React.FC<AllColorsViewProps> = (props) => {
  const colors = useAllColors();

  return (
    <ul {...props}>
      {colors.map((color) => (
        <li key={color.id}>{color.name}</li>
      ))}
    </ul>
  );
};

export default AllColorsView;
