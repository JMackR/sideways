import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { RemoteImage, Overlay, Margin } from '@upward/core-ui-library';
import { Text } from '@upward/core-ui-library';

interface AttachmentProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
  width: number;
  height: number;
  content: any;
}

export const Attachment = ({ index, animationValue, width, height, content }: AttachmentProps) => {
  const uri = React.useRef(`https://picsum.photos/400/300?t=${new Date().getTime()}`);

  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd'],
    );
    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View key={index} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="small" />
        <Overlay>
          <RemoteImage
            resizeMode="cover"
            width={width}
            height={height}
            source={{
              uri: uri.current,
            }}
          />
        </Overlay>
        <Margin marginLeftStep={25} marginRightStep={25} marginStep={10}>
          <Text textType="headerMedium2" textAlign="center" color="alwaysLight">
            {content.title}
          </Text>
        </Margin>
        <Margin marginLeftStep={10} marginRightStep={10}>
          <Text textType="headerMedium2" textAlign="center" color="alwaysLight">
            {content.body}
          </Text>
        </Margin>
      </View>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  );
};
