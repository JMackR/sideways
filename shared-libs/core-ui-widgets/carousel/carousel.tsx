import { Margin } from '@upward/core-ui-library';
import Swiper from 'react-native-swiper';

export const Carousel = (props: any) => {
  const {
    options,
    card,
    height,
    showButtons = true,
    showsPagination = true,
    buttonWrapperStyle,
    nextButton,
    prevButton,
  } = props;
  return (
    <Margin direction="column" axisDistribution="center">
      <></>
      <Swiper
        style={{ height, alignSelf: 'center' }}
        horizontal={true}
        loop={true}
        index={0}
        showsPagination={showsPagination}
        showsButtons={showButtons}
        buttonWrapperStyle={buttonWrapperStyle}
        nextButton={nextButton}
        prevButton={prevButton}
      >
        {options?.map((option: any) => card(option))}
      </Swiper>
    </Margin>
  );
};
