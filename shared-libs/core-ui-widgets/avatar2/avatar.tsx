import React from 'react';
import { Touchable, Text, SVG, RemoteImage, Flex, Border, Margin } from '@upward/core-ui-library';
import { AvatarProps } from './avatar.props';
import type { LocalSVGSource } from '@upward/core-ui-library';
import { AvatarIcon } from '@upward/assets';

export const Avatar2 = (props: AvatarProps) => {
  const { size, source, children, testID, onPress, borderColor, borderWidth, label } = props;
  const SIZE_TO_RADIUS_RATIO = 2;
  const borderRadius = size / SIZE_TO_RADIUS_RATIO;

  const formatLabel = () => {
    if (label) {
      const full_name = label?.split(' ');
      let initials = full_name[0][0];
      if (full_name.length >= 2 && full_name[1]) {
        initials += full_name[1][0];
        return initials;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  return (
    <Touchable onPress={onPress} disabled={!onPress}>
      <Flex direction="column" width={size} height={size}>
        {source && source !== 'undefined' && source !== 'null' ? (
          <RemoteImage
            source={{ uri: source }}
            width={size}
            height={size}
            borderRadius={borderRadius}
            aspectRatio={1}
            resizeMode="cover"
            testID={testID || 'avatar-image'}
            borderWidth={borderWidth}
            borderColor={borderColor}
          />
        ) : (
          <Flex direction="column" width={size} height={size}>
            <Border
              width={size}
              height={size}
              crossAxisDistribution={'center'}
              color={borderColor}
              cornerRadius={'circle'}
              axisDistribution={'center'}
            >
              <Margin marginTopStep={0.5}>
                <Text textType={'headerBold1'} color={'alwaysDark'}>
                  {formatLabel()}
                </Text>
              </Margin>
            </Border>
          </Flex>
        )}
        {children}
      </Flex>
    </Touchable>
  );
};
