import { Background, Button, Margin, Overlay, RemoteImage, SVG, Stack, Text } from '@upward/core-ui-library';
import { ClockIcon, WalkerIcon } from '@upward/assets';
import { View } from 'react-native';
import { percentageFormatter, useComponentSize } from '@upward/utilities';
import * as Progress from 'react-native-progress';

type BibleInfo = {
  isCurrentPlan: boolean;
  planTitle: string;
  description: string;
  time: string;
  planID: number;
  imageURL: string;
  planProgress: number;
};
export const BibleCard = ({
  planProgress,
  isCurrentPlan,
  planTitle,
  description,
  time,
  planID,
  imageURL,
}: BibleInfo) => {
  const [size, onLayout] = useComponentSize();

  return (
    <Margin grow={1} key={planID} marginLeftStep={8} marginRightStep={8}>
      <View onLayout={onLayout} style={{ flex: 1, alignItems: 'center', width: '100%' }}>
        {size && imageURL && (
          <Overlay>
            <RemoteImage
              resizeMode="cover"
              width={size?.width}
              height={size?.height}
              source={{
                uri: imageURL,
              }}
              borderRadius={6}
            />
          </Overlay>
        )}
        <Overlay insetBottomStep={0} direction="column" width={'60%'}>
          <Margin direction="column" marginBottomStep={2}>
            <Button
              onClick={async () => console.log('navigate', planID)}
              title="Read"
              buttonSize="large"
              buttonType="primary"
            ></Button>
          </Margin>
        </Overlay>
      </View>
    </Margin>
  );
};
