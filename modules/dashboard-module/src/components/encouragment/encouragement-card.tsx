import {
  Background,
  BackgroundContainer,
  Button,
  Margin,
  Overlay,
  RemoteImage,
  SVG,
  Stack,
  Text,
  Touchable,
} from '@upward/core-ui-library';
import { ClockIcon, WalkerIcon } from '@upward/assets';
import { View } from 'react-native';
import { percentageFormatter, useComponentSize } from '@upward/utilities';
import * as Progress from 'react-native-progress';

type PodCard = {
  option: PlanInfo;
  height: number;
};
type PlanInfo = {
  description: string;
  imageURL: string;
  podCastID: string;
  action: (id: string) => void;
};
export const EncouragementCard = ({ description, podCastID, imageURL, action }: PlanInfo) => {
  const [size, onLayout] = useComponentSize();
  return (
    <Touchable style={{ height: 325, justifyContent: 'center' }} onPress={() => action(podCastID)}>
      <Margin marginLeftStep={15} marginRightStep={15} marginTopStep={5}>
        <BackgroundContainer
          showShadow
          style={{
            backgroundColor: 'white',
            width: '100%',
            paddingVertical: 6,
            paddingHorizontal: 6,
            borderRadius: 6,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Margin width={'100%'} height={'100%'} marginLeftStep={10} crossAxisDistribution="center" marginRightStep={1}>
            <View onLayout={onLayout} style={{ height: '100%', width: '100%' }}>
              {size && imageURL && (
                <Overlay crossAxisDistribution="center" insetTopStep={5}>
                  <RemoteImage
                    resizeMode="cover"
                    width={size?.width * 0.7}
                    height={size?.height * 0.7}
                    source={{
                      uri: imageURL,
                    }}
                    borderRadius={6}
                  />
                </Overlay>
              )}
              <Margin grow={1} axisDistribution="flex-end" crossAxisDistribution="flex-start">
                <Text textType="headerBold2" textAlign="center" color={'primary'}>
                  {description}
                </Text>
              </Margin>
            </View>
          </Margin>
        </BackgroundContainer>
      </Margin>
    </Touchable>
  );
};
