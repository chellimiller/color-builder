/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
} from '@floating-ui/react';
import styled, { StyledComponent } from '@emotion/styled';
import { DialogContextProvider, useDialogContext } from './DialogContext';

/**
 * Props for the Dialog
 */
export type DialogProps = React.HTMLAttributes<HTMLDivElement>;

export type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface DialogComponent
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<DialogProps> & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<DialogTriggerProps> &
      React.RefAttributes<HTMLButtonElement>
  >;
  Provider: typeof DialogContextProvider;

  Title: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  Content: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
  Actions: StyledComponent<React.HTMLAttributes<HTMLHeadingElement>>;
}

const DialogOverlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
`.withComponent(FloatingOverlay);

const DialogWrapper = styled.div`
  background-color: var(--color--neutral--surface);
  color: var(--color--neutral--on-surface);
  margin: var(--m--md);
  padding: var(--p--lg);
  border-radius: var(--border-radius--md);
  display: flex;
  flex-flow: column nowrap;
`;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (props, forwardedRef) => {
    const { context: floatingContext, ...context } = useDialogContext();
    const ref = useMergeRefs([context.refs.setFloating, forwardedRef]);

    if (!floatingContext.open) return null;

    return (
      <FloatingPortal>
        <DialogOverlay lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <DialogWrapper
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              {props.children}
            </DialogWrapper>
          </FloatingFocusManager>
        </DialogOverlay>
      </FloatingPortal>
    );
  }
) as DialogComponent;

Dialog.Trigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, forwardedRef) => {
    const { children, ...forwardedProps } = props;
    const context = useDialogContext();
    const ref = useMergeRefs([context.refs.setReference, forwardedRef]);

    return (
      <button
        ref={ref}
        type="button"
        // The user can style the trigger based on the state
        data-state={context.open ? 'open' : 'closed'}
        {...context.getReferenceProps(forwardedProps)}
      >
        {children}
      </button>
    );
  }
);

Dialog.Provider = DialogContextProvider;

Dialog.Title = styled.h1`
  margin-bottom: var(--m--md);
`;

Dialog.Content = styled.div``;

Dialog.Actions = styled.div`
  margin-top: var(--m--md);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

export default Dialog;
