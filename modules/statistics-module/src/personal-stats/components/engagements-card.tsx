import { Background, BackgroundContainer, Margin, SVG, Stack, Text, } from '@upward/core-ui-library';
import { AwardIcon, RightArrowIcon, } from '@upward/assets';

export const EngagementsCard = ({ stats }) => {
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
                    <Margin grow={4} direction="column" axisDistribution="flex-start" marginStep={1}>
                        <Margin axisDistribution="center" >
                            <Text textType={'bodyMedium1'} color={'primary'}>
                                Engagements
                            </Text>
                        </Margin>
                        <Stack direction='row' crossAxisDistribution='stretch' axisDistribution='space-around' >
                            <Margin direction='column' crossAxisDistribution='center'>
                                <Margin axisDistribution="center">
                                    <Text textType={'bodyHeavy1'} color={'primary'}>
                                        {stats.records}
                                    </Text>
                                </Margin>
                                <Margin axisDistribution="center" crossAxisDistribution="flex-end" >
                                    <Text textType={'bodyRegular2'} color={'primary'}>
                                        posts
                                    </Text>
                                </Margin>
                            </Margin>
                            <Margin direction='column' crossAxisDistribution='center'>
                                <Margin axisDistribution="center">
                                    <Text textType={'bodyHeavy1'} color={'primary'}>
                                        {stats.records}
                                    </Text>
                                </Margin>
                                <Margin axisDistribution="center" crossAxisDistribution="flex-end" >
                                    <Text textType={'bodyRegular2'} color={'primary'}>
                                        podcasts
                                    </Text>
                                </Margin>
                            </Margin>
                            <Margin direction='column' crossAxisDistribution='center'>
                                <Margin axisDistribution="center">
                                    <Text textType={'bodyHeavy1'} color={'primary'}>
                                        {stats.records}
                                    </Text>
                                </Margin>
                                <Margin axisDistribution="center" crossAxisDistribution="flex-end" >
                                    <Text textType={'bodyRegular2'} color={'primary'}>
                                        devotions
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
