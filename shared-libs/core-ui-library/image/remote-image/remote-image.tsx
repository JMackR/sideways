import React, { FC, useState, memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { sanitizeAndValidateRemoteImageLayoutProps } from './remote-image.common';
import { RemoteImageProps } from './remote-image.props';

export const RemoteImage: FC<RemoteImageProps> = (props) => {
  const { width, height, aspectRatio } = sanitizeAndValidateRemoteImageLayoutProps(props);
  const { resizeMode, source, children, borderRadius, testID, borderWidth, borderColor, backgroundColor } = props;

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        aspectRatio,
      }}
      testID={testID || 'remote-image'}
      accessibilityLabel={testID || 'remote-image'}
    >
      <FastImage
        source={source}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        style={{
          width,
          height,
          aspectRatio,
          borderRadius,
          borderColor,
          borderWidth,
          backgroundColor,
        }}
        testID={testID || 'child-component'}
        accessibilityLabel={testID || 'child-component'}
      >
        {children}
      </FastImage>
      {isLoading && <LoadingView />}
    </View>
  );
};

const LoadingView: FC = memo(() => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
      }}
      testID="remote-image.loading-view"
    />
  );
});
