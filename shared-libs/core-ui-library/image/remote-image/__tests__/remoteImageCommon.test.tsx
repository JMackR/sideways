import { sanitizeAndValidateRemoteImageLayoutProps } from '../remote-image.common';
import { RemoteImageProps } from '../remote-image.props';
import invariant from 'invariant';

jest.mock('invariant');

describe('sanitizeAndValidateRemoteImageLayoutProps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('correctly validates layout props with width and height', () => {
    const props: RemoteImageProps = {
      resizeMode: 'contain',
      source: 'example-source',
      width: 320,
      height: 180,
    };
    const result = sanitizeAndValidateRemoteImageLayoutProps(props);
    expect(result).toEqual({ width: 320, height: 180, aspectRatio: undefined });
    expect(invariant).not.toHaveBeenCalledWith();
  });

  it('correctly validates layout props with aspectRatio', () => {
    const props: RemoteImageProps = {
      resizeMode: 'contain',
      source: 'example-source',
      aspectRatio: 16 / 9,
    };
    const result = sanitizeAndValidateRemoteImageLayoutProps(props);
    expect(result).toEqual({ width: undefined, height: undefined, aspectRatio: 16 / 9 });
    expect(invariant).not.toHaveBeenCalledWith();
  });

  it('adjusts width and height based on aspectRatio', () => {
    const props: RemoteImageProps = {
      resizeMode: 'contain',
      source: 'example-source',
      aspectRatio: 16 / 9,
      height: 180,
    };
    const result = sanitizeAndValidateRemoteImageLayoutProps(props);
    expect(result).toEqual({ width: (16 / 9) * 180, height: 180, aspectRatio: 16 / 9 });
    expect(invariant).not.toHaveBeenCalledWith();
  });
  it('adjusts height based on width and aspectRatio', () => {
    const props: RemoteImageProps = {
      resizeMode: 'contain',
      source: 'example-source',
      aspectRatio: 16 / 9,
      width: 150,
    };
    const result = sanitizeAndValidateRemoteImageLayoutProps(props);
    expect(result).toEqual({ width: 150, height: (150 * 9) / 16, aspectRatio: 16 / 9 });
    expect(invariant).not.toHaveBeenCalledWith();
  });

  it('throws an error when layout props are invalid', () => {
    const props: RemoteImageProps = {
      resizeMode: 'contain',
      source: 'example-source',
    };
    sanitizeAndValidateRemoteImageLayoutProps(props);
    expect(invariant).toHaveBeenCalledWith(
      false,
      "RemoteImage's layout props are not satisfied.\n(width and height) or ((width or height) and aspectRatio) must be set",
    );
  });
});
