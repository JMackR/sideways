import { useColorsForTextColorsCollection, useFontForTextType } from '@upward/themes';
import type { TextEntryProps } from './text-entry.props';
import { PixelRatio } from 'react-native';

export const ComputePropsForTextEntryProps = (props: TextEntryProps) => {
  const {
    autoCapitalize,
    autoCorrect,
    autoCompleteType,
    textType,
    textColor: textColorName,
    hintColor: hintColorName,
    linesMaximum,
    linesMinimum,
    tintColor: tintColorName,
  } = props;

  const font = useFontForTextType(textType !== undefined ? textType : 'bodyRegular2');
  const minLineHeight = Math.max(Math.floor(linesMinimum !== undefined ? linesMinimum : 1), 1);
  const maxLineHeight = Math.max(Math.floor(linesMaximum !== undefined ? linesMaximum : minLineHeight), minLineHeight);
  const isMultiline = minLineHeight > 1 || maxLineHeight > 1;
  const minPointHeight = minLineHeight * font?.lineHeight! * PixelRatio.getFontScale();
  const maxPointHeight = maxLineHeight * font?.lineHeight! * PixelRatio.getFontScale();

  const [primaryColor, hintColor, tintColor] = useColorsForTextColorsCollection([
    textColorName !== undefined ? textColorName : 'onBackground',
    hintColorName !== undefined ? hintColorName : 'onBackground',
    tintColorName !== undefined ? tintColorName : 'onBackground',
  ]);

  return {
    autoCapitalize: autoCapitalize !== undefined ? autoCapitalize : 'none',
    autoCorrect: autoCorrect !== undefined ? autoCorrect : true,
    autoCompleteType: autoCompleteType !== undefined ? autoCompleteType : 'off', // Android only
    font,
    minLineHeight,
    maxLineHeight,
    minPointHeight,
    maxPointHeight,
    isMultiline,
    primaryColor,
    hintColor,
    tintColor,
  };
};
