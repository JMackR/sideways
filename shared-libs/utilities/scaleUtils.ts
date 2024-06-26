import { Dimensions, PixelRatio } from 'react-native';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const hs = (size: number) => {
  const { width } = Dimensions.get('window');
  return (width / guidelineBaseWidth) * size;
};
const vs = (size: number) => {
  const { height } = Dimensions.get('window');
  return (height / guidelineBaseHeight) * size;
};

const ms = (size: number, factor = 0.5) => {
  return size + (hs(size) - size) * factor;
};

const maxPixelRatio = (value: any) => {
  const maxFontValue = (value / PixelRatio.getFontScale()) * 1.25;
  return PixelRatio.getFontScale() >= 1.5 ? maxFontValue : value;
};

export { hs, maxPixelRatio, ms, vs };

export type DimensionProps = {
  width: number;
  height: number;
};

export const useScale = (dimensions: DimensionProps) => {
  const { width, height } = dimensions;
  const hs = (size: number) => {
    return (width / guidelineBaseWidth) * size;
  };
  const vs = (size: number) => {
    return (height / guidelineBaseHeight) * size;
  };

  const ms = (size: number, factor = 0.5) => {
    return size + (hs(size) - size) * factor;
  };

  const maxPixelRatio = (value: any) => {
    const maxFontValue = (value / PixelRatio.getFontScale()) * 1.25;
    return PixelRatio.getFontScale() >= 1.5 ? maxFontValue : value;
  };
  return { hs, maxPixelRatio, ms, vs };
};
