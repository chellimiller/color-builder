/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  ColorSettings,
  ColorShade,
  DialogKey,
  HexColor,
  closeDialog,
  createColor,
  getColorShades,
  setNewColorMainColor,
  setNewColorMainShade,
  setNewColorName,
  useDialogData,
} from '../../state';
import { Dialog } from '../../ui/components';

/**
 * Props for the ColorEditorDialog component.
 */
export type ColorEditorDialogProps = React.HTMLAttributes<HTMLDivElement>;

const doSetColorName = (event: React.ChangeEvent<HTMLInputElement>) => {
  const name = event.target.value;
  setNewColorName(name);
};

const doSetColorValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  const color = event.target.value as HexColor;
  setNewColorMainColor(color);
};

const doSetColorShade = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const shade = event.target.value as ColorShade;
  setNewColorMainShade(shade);
};

const doSetColor = (settings: ColorSettings | null) => {
  if (settings) createColor(settings).then(closeDialog, console.error);
};

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const ColorEditorDialog: React.FC<ColorEditorDialogProps> = () => {
  const settings = useDialogData(DialogKey.NEW_COLOR);

  const nameId = React.useId();
  const colorId = React.useId();
  const shadeId = React.useId();

  return (
    <Dialog.Provider open={!!settings} onClose={closeDialog}>
      <Dialog>
        <Dialog.Title>Create Color</Dialog.Title>
        <Dialog.Content>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            value={settings?.name ?? ''}
            onChange={doSetColorName}
          />
          <label htmlFor={colorId}>Color</label>
          <input
            id={colorId}
            type="color"
            value={settings?.main.color ?? ''}
            onChange={doSetColorValue}
          />
          <label htmlFor={shadeId}>Shade</label>
          <select value={settings?.main.shade ?? ''} onChange={doSetColorShade}>
            {getColorShades().map((shade) => (
              <option key={shade} value={shade}>
                {shade}
              </option>
            ))}
          </select>
        </Dialog.Content>
        <Dialog.Actions>
          <button onClick={closeDialog} type="button">
            Cancel
          </button>
          <button
            onClick={() => doSetColor(settings)}
            disabled={!settings?.name}
            type="submit"
          >
            Create Color
          </button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Provider>
  );
};

export default ColorEditorDialog;
