import { Background, Border, Margin, Overlay, SVG, Text } from '@upward/core-ui-library';
import { TouchableOpacity } from 'react-native';
import { RadioButtonSelected, RadioButtonUnselected } from '@upward/assets';
import { TextTypes } from '@upward/themes';

export const PlanCard = (props: any) => {
  const {
    text: { text, textType },
    planInformation,
    setSelectedProgram,
    isSelected,
  } = props;
  const {
    description: { text: description, textType: descriptionTextType },
    details,
    title: { text: title, textType: titleTextType },
    skillLevel: { text: skillLevel, textType: skillLevelTextType },
    startDateInformation: { text: startDateInformation, textType: infoTextType },
  } = planInformation;

  return (
    <Margin direction="column" crossAxisDistribution="center" axisDistribution="center">
      <Border color={isSelected ? 'primary' : 'onBackground'} cornerRadius={'large'}>
        <Background borderRadius={5} type={'surface'} />
        <Margin
          direction="column"
          marginStep={2}
          crossAxisDistribution="center"
          axisDistribution="center"
          height={325}
          width={300}
        >
          <Overlay insetTopStep={0}>
            <Margin crossAxisDistribution="center">
              <Text textType={titleTextType} textAlign="center" color={'primary'}>
                {title}
              </Text>
              {skillLevel && (
                <Text textType={skillLevelTextType} textAlign="center" color={'primary'}>
                  {skillLevel}
                </Text>
              )}
            </Margin>
            {details && details.length > 0 && (
              <Margin crossAxisDistribution="center" direction="row" width={300} axisDistribution="center">
                {details?.map(
                  ({ text: infoText, textType: detailsTextType }: { text: string; textType: keyof TextTypes }) => {
                    return (
                      <Margin crossAxisDistribution="center" marginStep={1} shrink={1}>
                        <Text textType={detailsTextType} textAlign="center" color={'brand'}>
                          {infoText}
                        </Text>
                      </Margin>
                    );
                  },
                )}
              </Margin>
            )}
            {startDateInformation && (
              <Margin crossAxisDistribution="center" marginStep={1} shrink={0}>
                <Text textType={infoTextType} textAlign="center" color={'brand'}>
                  {startDateInformation}
                </Text>
              </Margin>
            )}
          </Overlay>
          <Margin
            crossAxisDistribution="center"
            axisDistribution="center"
            grow={1}
            marginTopStep={8}
            marginBottomStep={2}
            wrap={true}
          >
            <Text textType={descriptionTextType} color={'primary'}>
              {description}
            </Text>
          </Margin>
          <Overlay insetBottomStep={0}>
            <TouchableOpacity onPress={() => setSelectedProgram(planInformation)}>
              <Margin direction="row" marginStep={4} axisDistribution="center" crossAxisDistribution="center">
                <Margin axisDistribution="center" marginStep={1}>
                  <SVG
                    tint={'brand'}
                    localSVG={{
                      SVG: isSelected ? RadioButtonSelected.SVG : RadioButtonUnselected.SVG,
                      size: { width: 20, height: 20 },
                    }}
                  />
                </Margin>
                <Margin marginStep={1}>
                  <Text textType={textType} color={'primary'}>
                    {text}
                  </Text>
                </Margin>
              </Margin>
            </TouchableOpacity>
          </Overlay>
        </Margin>
      </Border>
    </Margin>
  );
};
