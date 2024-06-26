import { Background, BackgroundContainer, Margin, SVG, Stack, Text, } from '@upward/core-ui-library';
import { RightArrowIcon, RunnerIcon } from '@upward/assets';

export const MilesCard = ({ stats }) => {
    return (
        <BackgroundContainer
            showShadow
            style={{
                backgroundColor: 'white',
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderRadius: 6,
            }}
        >
            <Margin
                grow={1}
                direction="row"
                marginLeftStep={1}
                marginRightStep={1}
            >
                <Margin grow={1} direction='row'>
                    <Margin axisDistribution="center" marginStep={1}>
                        <Background borderRadius={5} type={'brand'} />
                        <Margin axisDistribution="center" marginStep={5}>
                            <SVG
                                tint={'light'}
                                localSVG={{
                                    SVG: RunnerIcon.SVG,
                                    size: { width: 30, height: 30 },
                                }}
                            />
                        </Margin>
                    </Margin>
                    <Margin grow={4} direction="column" axisDistribution="center" marginStep={1}>
                        <Margin axisDistribution="center" >
                            <Text textType={'bodyMedium1'} color={'primary'}>
                                Miles
                            </Text>
                        </Margin>
                        <Stack direction='row' crossAxisDistribution='stretch'  >
                            <Margin direction='row' crossAxisDistribution='center' >
                                <Margin axisDistribution="center" marginRightStep={3} marginLeftStep={5}>
                                    <Text textType={'bodyHeavy1'} color={'primary'}>
                                        {stats.records}
                                    </Text>
                                </Margin>
                                <Margin axisDistribution="center" crossAxisDistribution="flex-end" >
                                    <Text textType={'bodyRegular2'} color={'primary'}>
                                        avg/month
                                    </Text>
                                </Margin>
                            </Margin>
                        </Stack>
                    </Margin>
                    <Margin grow={0.25} axisDistribution="center" crossAxisDistribution='flex-end' >
                        <SVG
                            tint={'secondary'}
                            localSVG={{
                                SVG: RightArrowIcon.SVG,
                                size: { width: 30, height: 30 },
                            }}
                        />
                    </Margin>
                </Margin>
            </Margin>
        </BackgroundContainer>
    );
};
