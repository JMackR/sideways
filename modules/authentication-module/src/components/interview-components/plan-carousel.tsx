import { Border, Margin, Text } from '@upward/core-ui-library';
import Swiper from 'react-native-swiper';
import { SceneObject } from '../onboarding-coordinator/onboarding-types';
import { PlanCard } from './plan-card';
import { View } from 'react-native';

export const PlanCarousel = (props: SceneObject) => {
  const { options } = props;

  const setSelectedProgram = () => {};

  return (
    <Margin direction="column" axisDistribution="center">
      <Margin direction="column" crossAxisDistribution="center" marginBottomStep={4} marginTopStep={8}>
        <Swiper style={{ height: 350, alignSelf: 'center' }} horizontal={true} loop={true} index={0} showsButtons>
          {options?.map((option) => (
            <PlanCard {...option} setSelectedProgram={setSelectedProgram} />
          ))}
        </Swiper>
      </Margin>
    </Margin>
  );
};
