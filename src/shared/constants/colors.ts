import { presetDarkPalettes } from '@ant-design/colors';

export const AntdDartPalettePresetColorsNames = Object.keys(presetDarkPalettes);

export const getRandomDarkPaletteColor = () => {
  const randomColorIndex = Math.floor(Math.random() * 10);
  const randomColorNameIndex = Math.floor(Math.random() * AntdDartPalettePresetColorsNames.length);
  return presetDarkPalettes[
    AntdDartPalettePresetColorsNames[randomColorNameIndex]
  ][randomColorIndex];
};
