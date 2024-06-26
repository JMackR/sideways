import { CheckBoxSelected, CheckBoxUnselected } from '@upward/assets';
import { Margin, Text, RemoteImage, SVG } from '@upward/core-ui-library';
import { useCallback, useState } from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';

const useComponentSize = () => {
  const [size, setSize] = useState();

  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
export const SocialCard = (props: any) => {
  const {
    mainContent: {
      image,
      text: { text, textType },
      tooltipText,
    },
    clickAction,
    isSelected,
  } = props;
  const [size, onLayout] = useComponentSize();

  return (
    <TouchableOpacity onPress={clickAction}>
      <View onLayout={onLayout}>
        {size && (
          <Margin crossAxisDistribution="center" marginTopStep={1}>
            <RemoteImage
              resizeMode="cover"
              width={size?.width * 0.97}
              height={50}
              source={{
                uri: image,
              }}
              borderRadius={6}
            />
          </Margin>
        )}
        <Margin direction="row" marginStep={4}>
          <Margin width={'40%'} grow={1} crossAxisDistribution="flex-start">
            <Text textType={textType} color={'primary'}>
              {text}
            </Text>
          </Margin>
          <Margin width={'50%'} crossAxisDistribution="center">
            <Text textType={'bodyMedium3'} textAlign="center" color={'primary'}>
              {tooltipText}
            </Text>
          </Margin>
          <Margin width={'10%'} axisDistribution="center" crossAxisDistribution="flex-end">
            <SVG
              tint={'brand'}
              localSVG={{
                SVG: isSelected ? CheckBoxSelected.SVG : CheckBoxUnselected.SVG,
                size: { width: 20, height: 20 },
              }}
            />
          </Margin>
        </Margin>
      </View>
    </TouchableOpacity>
  );
};
