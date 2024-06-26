// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import deepFreeze from 'deep-freeze';
import { ColorTheme } from '../type-defs';

export const LIGHT_MODE_THEME_ID = 'light_mode';

export const LIGHT_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: LIGHT_MODE_THEME_ID,
  displayName: 'Light mode',
  shade: 'light',
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
    info: '#E4F8FF',
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
    forestGreen: '#005807',
    gold: '#FFAE00',
  },
  fontColors: {
    primary: 'dark',
    brand: 'brand',
    secondary: 'altBackground',
    alwaysLight: 'white',
    alwaysDark: 'dark',
    error: 'danger',
    light: 'white',
    disabled: 'gray',
    brandAlt: 'white',
  },
  backgroundColors: {
    primary: 'white',
    brand: 'brand',
    alwaysDark: 'dark',
    alwaysLight: 'white',
    error: 'danger',
    onBackground: 'gray',
    surface: 'offWhite',
    brandAlt: 'white',
    clear: 'transparent',
    info: 'info',
    forestGreen: 'forestGreen',
    gold: 'gold',
  },
});
