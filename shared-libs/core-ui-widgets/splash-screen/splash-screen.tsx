import React from 'react';
import { Image, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { logo } from '@upward/assets';
import { useColorTheme } from '@upward/themes';
import { isTablet } from '@upward/utilities';

export const SplashScreen = () => {
  const colorScheme = useColorScheme();
  const theme = useColorTheme();

  const themeBackground = {
    backgroundColor: colorScheme === 'dark' ? theme.colors.darkBackground : theme.colors.brand,
  };

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? theme.colors.darkBackground : theme.colors.brand}
      />

      <View style={[styles.container, themeBackground]}>
        {/* <Image testID="splash-screen_image" style={styles.image} source={logo} resizeMode="contain" /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999999,
  },
  image: {
    maxWidth: isTablet ? 200 : 100,
  },
});
