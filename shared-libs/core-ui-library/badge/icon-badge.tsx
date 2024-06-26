import React from 'react';
import { BackgroundContainer } from '..';
import { useFontTheme } from '@upward/themes';
import { View } from 'react-native';
import { SVG } from '../image';
import { IconBadgeProps } from './icon-badge.props';

export const IconBadge: React.FC<IconBadgeProps> = (props) => {
  const { icon, testID } = props;
  const fontTheme = useFontTheme();
  const size = fontTheme.baseMargin * 4;

  return (
    <View
      style={{ position: 'absolute', right: 0, top: 0 }}
      testID={testID || 'icon-badge'}
      accessibilityLabel={testID || 'icon-badge'}
    >
      <View style={{ borderRadius: 8, overflow: 'hidden' }}>
        <BackgroundContainer />
        <SVG
          localSVG={{
            SVG: icon.SVG,
            size: { width: size, height: size },
          }}
        />
      </View>
    </View>
  );
};
