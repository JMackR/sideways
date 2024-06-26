import { Margin, Text } from '@upward/core-ui-library';
import { SceneObject, TextObject } from '../onboarding-coordinator/onboarding-types';

export const Header = ({ title, textFields }: SceneObject) => {
  const { textType, text } = title as TextObject;
  return (
    <Margin grow={1} direction="column" axisDistribution="center">
      <Margin grow={1} direction="column" axisDistribution="center" marginTopStep={4}>
        <Text textType={textType} color={'primary'}>
          {text}
        </Text>
      </Margin>
      {textFields && textFields.length > 0 && textFields[0].text !== 'View all Growth Plans' && (
        <Margin grow={1} direction="column" axisDistribution="center" marginTopStep={4}>
          {textFields?.map(({ textType, text }) => {
            return (
              <>
                <Text textType={textType} color={'primary'}>
                  {text}
                </Text>
              </>
            );
          })}
        </Margin>
      )}
    </Margin>
  );
};
