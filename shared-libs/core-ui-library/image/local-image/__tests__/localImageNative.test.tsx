import { render } from '@testing-library/react-native';
import { LocalImage } from '../local-image.native';

jest.mock('invariant', () => jest.fn());

jest.mock('@upward/themes/hooks', () => ({
  useColorForBackgroundColor: jest.fn(() => 'background-color'),
}));

jest.mock('react-native', () => ({
  Image: jest.fn((props) => props),
}));

describe('LocalImage', () => {
  it('should render Image component with correct props', () => {
    const source = { uri: 'image-url' };
    const resizeMode = 'contain';
    const width = 100;
    const height = 100;
    const aspectRatio = 1;
    const borderRadius = 5;

    const { getByTestId } = render(
      <LocalImage
        source={source}
        resizeMode={resizeMode}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        borderRadius={borderRadius}
        testID="local-image"
      />,
    );

    const imageComponent = getByTestId('local-image').findByType('Image');
    expect(imageComponent).toBeTruthy();
    expect(imageComponent.props.source).toEqual(source);
    expect(imageComponent.props.resizeMode).toEqual(resizeMode);
    expect(imageComponent.props.onLoadEnd).toBeDefined();
    expect(imageComponent.props.style).toEqual({
      width,
      height,
      aspectRatio,
      borderRadius,
    });
  });
});
