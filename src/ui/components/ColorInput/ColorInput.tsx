import styled from '@emotion/styled';
import * as React from 'react';
import { ColorSwatchIcon } from '../../icons';
import { text } from '../../emotion';

/**
 * Props for the ColorInput
 */
export interface ColorInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  label?: string;
  hideLabel?: boolean;
}

const Wrapper = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  position: relative;

  &:hover {
    background: var(--color--neutral--container--hover);
    color: var(--color--neutral--on-container--hover);
  }

  &:focus-within {
    background: var(--color--neutral--container--active);
    color: var(--color--neutral--on-container--active);
  }

  cursor: pointer;
`;

const Trigger = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: var(--p--sm);
  margin: 0;

  cursor: pointer;
`;

const HiddenColorInput = styled.input`
  cursor: pointer;
  visibility: hidden;
  position: absolute;
  top: 12;
  left: 12;
`;

const TextInput = styled.input`
  cursor: pointer;
  padding: 0 var(--p--md);
  margin: 0 var(--m--xs);
  ${text.md}
  cursor: pointer;
  background: transparent;
  border: none;
  color: inherit;
  min-width: var(--size--lg);
  max-width: var(--size--lg);
`;

const Label = styled.label`
  padding: 0 var(--p--md);
  user-select: none;
  ${text.md}
  cursor: pointer;
  pointer-events: none;
`;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const ColorInput: React.FC<ColorInputProps> = (props) => {
  const {
    value,
    onChange,
    label = 'Color',
    hideLabel = false,
    ...forwardedProps
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputId = React.useId();

  return (
    <Wrapper {...forwardedProps}>
      <Trigger
        role="button"
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
        onKeyDown={(event) => {
          if (!inputRef.current) return;
          if (event.key === 'Enter' || event.key === ' ')
            inputRef.current.click();
        }}
        tabIndex={0}
      >
        {!hideLabel && <Label htmlFor={inputId}>{label}</Label>}
        <ColorSwatchIcon color={value} shape="square" />
        <HiddenColorInput
          type="color"
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event, event.target.value)}
          id={inputId}
          aria-label={hideLabel ? label : undefined}
        />
      </Trigger>
      <TextInput
        aria-label={`Text input for ${label}`}
        value={value}
        onChange={(event) => onChange(event, event.target.value)}
      />
    </Wrapper>
  );
};

export default ColorInput;
