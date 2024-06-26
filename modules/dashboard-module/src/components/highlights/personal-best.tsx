import { Background, BackgroundContainer, Margin, SVG, Separator, Text, Touchable } from '@upward/core-ui-library';
import { AwardIcon, RunnerIcon } from '@upward/assets';

export const PersonalBestStat = ({ stats }) => {
  return (
    <Margin direction="row" axisDistribution="center">
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
            <Background borderRadius={5} type={'gold'} />
            <Margin axisDistribution="center" marginStep={5}>
              <SVG
                tint={'light'}
                localSVG={{
                  SVG: AwardIcon.SVG,
                  size: { width: 30, height: 30 },
                }}
              />
            </Margin>
          </Margin>
          <Margin direction="row" axisDistribution="flex-start" marginStep={1}>
            <Margin axisDistribution="center" marginRightStep={10} marginLeftStep={2}>
              <Text textType={'bodyMedium1'} color={'primary'}>
                Personal Bests
              </Text>
            </Margin>
            <Margin axisDistribution="center" marginStep={1}>
              <Text textType={'bodyHeavy1'} color={'primary'}>
                {stats.records}
              </Text>
            </Margin>
            <Margin axisDistribution="center" crossAxisDistribution="flex-end" marginStep={1}>
              <Text textType={'bodyMedium1'} color={'primary'}>
                records
              </Text>
            </Margin>
          </Margin>
        </Margin>
      </BackgroundContainer>
    </Margin>
  );
};
