import React from 'react';
import { Pressable, View } from 'react-native';
import { TouchableProps } from './touchable.d';

export const Touchable: React.FC<TouchableProps> = (props) => {
  const { onPress, style, children, testID, disabled } = props;

  return (
    <Pressable onPress={onPress} disabled={disabled} testID={testID || 'touchable'}>
      <View style={style}>{children}</View>
    </Pressable>
  );
};
