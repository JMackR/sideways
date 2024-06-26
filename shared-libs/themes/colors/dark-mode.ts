// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import deepFreeze from 'deep-freeze';
import { ColorTheme } from '../type-defs';
export const DARK_MODE_THEME_ID = 'dark_mode';

export const DARK_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: DARK_MODE_THEME_ID,
  displayName: 'Dark mode',
  shade: 'dark',
  animation: {
    scale: 1,
  },
  colors: {
    brand: '#0047AB',
    white: '#FFFFFF',
    offWhite: '#FFF4F426',
    danger: '#d12428',
    success: '#26822A',
    warning: '#FCE118',
    info: '#007FAC',
    darkBackground: '#121212',
    lightBackground: '#F4F4F4',
    dark: '#202020',
    altBackground: '#2c2c2c',
    gray: '#d8d8d8',
    gray20: '#454545',
    gray40: '#616161',
    gray70: '#797979',
    transparent: 'transparent',
    opaque: 'rgba(0,0,0,0.1)',
  },
  fontColors: {
    primary: 'brand',
    secondary: 'altBackground',
    alwaysLight: 'white',
    alwaysDark: 'dark',
    error: 'danger',
    light: 'white',
    disabled: 'gray20',
  },
  backgroundColors: {
    primary: 'brand',
    alwaysDark: 'dark',
    alwaysLight: 'white',
    error: 'danger',
    surface: 'offWhite',
    brandAlt: 'white',
  },
});
