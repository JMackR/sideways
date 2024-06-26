import { FaceConfusedIcon } from '@upward/assets';
import { Button, Margin, SVG } from '@upward/core-ui-library';
import { useColorForBackgroundColor, useColorTheme } from '@upward/themes';
import React from 'react';
import RNRestart from 'react-native-restart';
import { StyleSheet, View } from 'react-native';
import { Text } from '@upward/core-ui-library';

export type ErrorProps = { message?: string; error?: Error; resetError?: () => void };

export const GenericErrorFallback = (props: ErrorProps) => {
  const { message } = props;
  const themeBackground = {
    backgroundColor: useColorForBackgroundColor('baseBackground'),
  };
  const theme = useColorTheme();
  const styles = useStyles(theme);
  const restart = async () => {
    RNRestart.restart();
  };
  return (
    <>
      <View style={[styles.container, themeBackground]}>
        <View style={styles.iconContainer}>
          <SVG
            localSVG={{
              SVG: FaceConfusedIcon.SVG,
              size: {
                width: 80,
                height: 80,
              },
            }}
            tint={'primary'}
          />
        </View>
        <Margin marginLeftStep={4} marginRightStep={4}>
          <Text textType="bodyRegular1" textAlign="center">
            {message ? message : '404 - An error occurred. Please try reloading the app.'}
          </Text>
        </Margin>
        <Margin marginLeftStep={2} marginRightStep={2} marginTopStep={6}>
          <Button onClick={restart} buttonSize="small" buttonType="primary" title="Restart" />
        </Margin>
      </View>
    </>
  );
};

const useStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 999999,
    },
    iconContainer: {
      padding: 10,
      marginBottom: 22,
    },
    textContainer: {
      // paddingHorizontal: isTablet ? 24 : 16,
      paddingVertical: 10,
      alignItems: 'center',
    },
    text: {
      // fontSize: isTablet ? 20 : 16,
      fontWeight: '700',
      color: theme.colors.onBackground,
    },
  });
