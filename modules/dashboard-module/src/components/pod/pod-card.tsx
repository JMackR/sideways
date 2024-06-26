import { Background, Button, Margin, Overlay, RemoteImage, SVG, Stack, Text } from '@upward/core-ui-library';
import { ClockIcon, WalkerIcon } from '@upward/assets';
import { View } from 'react-native';
import { percentageFormatter, useComponentSize } from '@upward/utilities';
import * as Progress from 'react-native-progress';

type PodCard = {
  option: PlanInfo;
  height: number;
};
type PlanInfo = {
  isCurrentPlan: boolean;
  planTitle: string;
  description: string;
  time: string;
  planID: number;
  imageURL: string;
  planProgress: number;
};
export const PodCard = ({ planProgress, isCurrentPlan, planTitle, description, time, planID, imageURL }: PlanInfo) => {
  const [size, onLayout] = useComponentSize();

  return (
    <Margin key={planID} marginLeftStep={8} marginRightStep={8}>
      <Background borderRadius={5} type={'surface'} />
      <Margin marginStep={2} crossAxisDistribution="center">
        <Margin marginBottomStep={2}>
          <Text textType="bodyBold1" color={'primary'}>
            {planTitle}
          </Text>
        </Margin>
        <Stack direction="row" axisDistribution="center" crossAxisDistribution="center" height={25}>
          {planProgress && (
            <>
              {size && <Progress.Bar progress={planProgress} height={10} width={size?.width * 0.7} />}
              <Margin crossAxisDistribution="center" marginLeftStep={2}>
                <Text textType="bodyMedium1" color={'primary'}>
                  {percentageFormatter(planProgress)}
                </Text>
              </Margin>
            </>
          )}
        </Stack>
      </Margin>
      <View onLayout={onLayout} style={{ flex: 0 }}>
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
        <Margin marginStep={2}>
          <Margin direction="column">
            <Margin>
              <Text textType="headerBold2" color={'light'} dropShadow={true}>
                {isCurrentPlan ? "Today's Workout" : ` `}
              </Text>
            </Margin>
            <Margin marginStep={2} direction="row" crossAxisDistribution="center" axisDistribution="flex-start">
              <Margin axisDistribution="center" marginStep={1}>
                <SVG
                  tint={'light'}
                  localSVG={{
                    SVG: WalkerIcon.SVG,
                    size: { width: 20, height: 20 },
                  }}
                />
              </Margin>
              <Margin axisDistribution="center">
                <Text textType="bodyMedium1" textAlign="center" color={'light'} dropShadow={true}>
                  {description}
                </Text>
              </Margin>
            </Margin>
            <Margin
              marginStep={2}
              direction="row"
              crossAxisDistribution="center"
              wrap={true}
              axisDistribution="flex-start"
            >
              <Margin axisDistribution="center" marginStep={1}>
                <SVG
                  tint={'light'}
                  localSVG={{
                    SVG: ClockIcon.SVG,
                    size: { width: 20, height: 20 },
                  }}
                />
              </Margin>
              <Margin axisDistribution="center" marginStep={1}>
                <Text textType={'bodyMedium1'} color={'light'} dropShadow={true}>
                  {time}
                </Text>
              </Margin>
            </Margin>
          </Margin>
          <Margin crossAxisDistribution="flex-end">
            <Button
              onClick={async () => console.log('navigate', planID)}
              title="Get Started"
              buttonSize="medium"
              buttonType="primary"
            ></Button>
          </Margin>
        </Margin>
      </View>
    </Margin>
  );
};
