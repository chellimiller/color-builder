import { useLiveQuery } from 'dexie-react-hooks';
import { Color, ColorSettings, ColorShade, HexColor } from '../../types';
import database from '../_dexie';
import buildColor from './buildColor';
import generateUUID from '../generateUUID';

function getColor(id: Color['id']): Promise<Color | undefined> {
  return database.colors.get(id);
}

export function useColor(id?: Color['id']): Color | undefined {
  return useLiveQuery(() => (!id ? undefined : getColor(id)), [id]);
}

function getAllColors(): Promise<Color[]> {
  return database.colors.toArray();
}

export function useAllColors(): Color[] {
  return useLiveQuery(() => getAllColors()) ?? [];
}

export function useAllColorIds(): Color['id'][] {
  return (
    useLiveQuery(() =>
      getAllColors().then((colors) => colors.map(({ id }) => id))
    ) ?? []
  );
}

export function removeColor(id: Color['id']): Promise<void> {
  return database.colors.delete(id);
}

export function setColor(data: Color): Promise<string> {
  return database.colors.put(data, data.id);
}

export async function setColorShade(params: {
  shade: ColorShade;
  id: Color['id'];
  value: HexColor;
}): Promise<string | false> {
  const { shade, id, value } = params;

  const color = await getColor(id);

  if (!color) throw new Error(`Color ${id} not found`);

  const { overrides } = color;

  if (overrides[shade] === value) return Promise.resolve(id);

  return setColor({
    ...color,
    overrides: { ...overrides, [shade]: value },
  });
}

export async function resetColorShade(params: {
  shade: ColorShade;
  id: Color['id'];
}): Promise<string | false> {
  const { shade, id } = params;

  const color = await getColor(id);

  if (!color) throw new Error(`Color ${id} not found`);

  const { overrides } = color;

  if (!overrides[shade]) return Promise.resolve(id);

  return setColor({
    ...color,
    overrides: { ...overrides, [shade]: undefined },
  });
}

export async function createColor(settings: ColorSettings): Promise<string> {
  const color = buildColor(settings);
  const id = generateUUID();

  return setColor({ ...color, id });
}
