import { Platform } from 'react-native';
import type { FontTheme, FontWeight, FontStyle } from '../type-defs';
import { maxPixelRatio, ms } from '@upward/utilities';

const fontBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'Roboto-Black',
    fontWeight: Platform.select<FontWeight>({
      ios: '900',
      android: '900',
    }),
  };
};

const fontMedium = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'Roboto-Medium',
    fontWeight: Platform.select<FontWeight>({
      ios: '500',
      android: '500',
    }),
  };
};
const fontHeavyMedium = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'Roboto-Medium',
    fontWeight: Platform.select<FontWeight>({
      ios: '700',
      android: '700',
    }),
  };
};
const fontRegular = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  };
};

export const MOBILE_FONT_THEME: FontTheme = {
  identifier: 'standard',
  displayName: 'Standard',
  baseMargin: ms(4),
  baseBorder: {
    cornerRadius: { small: 4, large: 7 },
    lineWeight: { light: 1, heavy: 4 },
  },
  fonts: {
    headerBold1: fontBold({
      fontSize: maxPixelRatio(ms(36)),
      lineHeight: maxPixelRatio(ms(44)),
    }),
    headerBold2: fontBold({
      fontSize: maxPixelRatio(ms(22)),
      lineHeight: maxPixelRatio(ms(36)),
    }),
    headerMedium1: fontMedium({
      fontSize: maxPixelRatio(ms(22)),
      lineHeight: maxPixelRatio(ms(28)),
    }),
    headerMedium2: fontMedium({
      fontSize: maxPixelRatio(ms(18)),
      lineHeight: maxPixelRatio(ms(24)),
    }),
    bodyHeavy1: fontHeavyMedium({
      fontSize: maxPixelRatio(ms(18)),
      lineHeight: maxPixelRatio(ms(24)),
    }),
    bodyHeavy2: fontHeavyMedium({
      fontSize: maxPixelRatio(ms(16)),
      lineHeight: maxPixelRatio(ms(22)),
    }),
    bodyHeavy3: fontHeavyMedium({
      fontSize: maxPixelRatio(ms(14)),
      lineHeight: maxPixelRatio(ms(20)),
    }),
    bodyBold1: fontBold({
      fontSize: maxPixelRatio(ms(16)),
      lineHeight: maxPixelRatio(ms(22)),
    }),
    bodyBold2: fontBold({
      fontSize: maxPixelRatio(ms(14)),
      lineHeight: maxPixelRatio(ms(20)),
    }),
    bodyBold3: fontBold({
      fontSize: maxPixelRatio(ms(11)),
      lineHeight: maxPixelRatio(ms(19)),
    }),
    bodyMedium1: fontMedium({
      fontSize: maxPixelRatio(ms(16)),
      lineHeight: maxPixelRatio(ms(22)),
    }),
    bodyMedium2: fontMedium({
      fontSize: maxPixelRatio(ms(14)),
      lineHeight: maxPixelRatio(ms(20)),
    }),
    bodyMedium3: fontMedium({
      fontSize: maxPixelRatio(ms(12)),
      lineHeight: maxPixelRatio(ms(18)),
    }),

    bodyRegular1: fontRegular({
      fontSize: maxPixelRatio(ms(16)),
      lineHeight: maxPixelRatio(ms(22)),
    }),
    bodyRegular2: fontRegular({
      fontSize: maxPixelRatio(ms(14)),
      lineHeight: maxPixelRatio(ms(20)),
    }),
    bodyRegular3: fontRegular({
      fontSize: maxPixelRatio(ms(12)),
      lineHeight: maxPixelRatio(ms(18)),
    }),
    bodyRegular4: fontRegular({
      fontSize: maxPixelRatio(ms(11)),
      lineHeight: maxPixelRatio(ms(19)),
    }),
  },
};
