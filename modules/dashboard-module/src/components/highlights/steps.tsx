import { Background, BackgroundContainer, Margin, SVG, Separator, Text, Touchable } from '@upward/core-ui-library';
import { RunnerIcon, WalkerIcon } from '@upward/assets';

export const StepsStat = ({ stats }) => {
  return (
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
      <Margin
        direction="row"
        crossAxisDistribution="center"
        wrap={true}
        axisDistribution="flex-start"
        marginLeftStep={1}
        marginRightStep={1}
      >
        <Margin axisDistribution="center" marginStep={1}>
          <Background borderRadius={5} type={'forestGreen'} />
          <Margin axisDistribution="center" marginStep={5}>
            <SVG
              tint={'light'}
              localSVG={{
                SVG: WalkerIcon.SVG,
                size: { width: 30, height: 30 },
              }}
            />
          </Margin>
        </Margin>
        <Margin direction="column" axisDistribution="flex-start" marginStep={1}>
          <Text textType={'bodyMedium1'} color={'primary'}>
            Steps
          </Text>
          <Text textType={'bodyHeavy1'} color={'primary'}>
            {stats.steps}
          </Text>
          <Text textType={'bodyMedium2'} color={'primary'}>
            steps/month
          </Text>
        </Margin>
      </Margin>
    </BackgroundContainer>
  );
};
