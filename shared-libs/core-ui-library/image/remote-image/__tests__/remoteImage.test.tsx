import { render, fireEvent } from '@testing-library/react-native';
import { RemoteImage } from '../remote-image';

jest.mock('react-native-fast-image', () => 'FastImage');

describe('RemoteImage', () => {
  it('renders correctly with source', () => {
    const { getByTestId } = render(
      <RemoteImage source={{ uri: 'https://example.com/image.jpg' }} width={100} height={100} resizeMode="center" />,
    );
    const remoteImage = getByTestId('remote-image');
    expect(remoteImage).toBeDefined();
  });

  it('renders correctly with children', () => {
    const { getByTestId } = render(
      <RemoteImage
        source={{ uri: 'https://example.com/image.jpg' }}
        width={100}
        height={100}
        resizeMode="center"
      ></RemoteImage>,
    );
    const childComponent = getByTestId('child-component');
    expect(childComponent).toBeDefined();
  });

  it('handles loading state correctly', () => {
    const { getByTestId, queryByTestId } = render(
      <RemoteImage source={{ uri: 'https://example.com/image.jpg' }} width={100} height={100} resizeMode="center" />,
    );
    expect(getByTestId('remote-image')).toBeDefined();
    expect(queryByTestId('remote-image.loading-view')).toBeDefined();
    fireEvent(getByTestId('remote-image'), 'onLoadEnd');
  });
});
