import React from 'react';
import { useColor, useColorForTextColor } from '@upward/themes/hooks';
import { TouchableOpacity } from 'react-native';
import { LocalSVGSource } from './svg-props-base';
import { SvgPropsNative } from './svg-props';

export const SVG = (props: SvgPropsNative) => {
  const { localSVG, tint, testID, onPress, onPressHint } = props;
  const { colors } = useColor();
  const iconTintColor = useColorForTextColor(tint!);
  const { SVG: SVGR, size } = localSVG as LocalSVGSource;
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} onPressHint={onPressHint} testID={testID} {...props}>
        <SVGR {...size} {...colors} fill={iconTintColor} />
      </TouchableOpacity>
    );
  }

  return <SVGR {...size} {...colors} fill={iconTintColor} />;
};
