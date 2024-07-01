import { Canvas, Circle, Path, Rect, Skia, useSharedValueEffect, useValue } from '@shopify/react-native-skia';
import { Margin, Stack, Text } from '@upward/core-ui-library';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { polar2Canvas } from 'react-native-redash';

const { width, height } = Dimensions.get('window');

//const ghost = require('./ghost.png');

export const ArcSlider = () => {
  const strokeWidth = 30;
  const center = width / 2.15;
  const r = (width - strokeWidth) / 2 - 40;
  //  120;

  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;
  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);
  const previousPositionX = useSharedValue(x2);
  const previousPositionY = useSharedValue(y2);
  const percentComplete = useSharedValue(0);

  //  const gesture = Gesture.Pan()
  //    .onUpdate(({ translationX, translationY, absoluteX }) => {
  //      const oldCanvasX = translationX + previousPositionX.value;
  //      const oldCanvasY = translationY + previousPositionY.value;

  //      const xPrime = oldCanvasX - center;
  //      const yPrime = -(oldCanvasY - center);
  //      const rawTheta = Math.atan2(yPrime, xPrime);

  //      let newTheta;

  //      if (absoluteX < width / 2 && rawTheta < 0) {
  //        newTheta = Math.PI;
  //      } else if (absoluteX > width / 2 && rawTheta <= 0) {
  //        newTheta = 0;
  //      } else {
  //        newTheta = rawTheta;
  //      }

  //      const percent = 1 - newTheta / Math.PI;
  //      percentComplete.value = percent;

  //      const newCoords = polar2Canvas(
  //        {
  //          theta: newTheta,
  //          radius: r,
  //        },
  //        {
  //          x: center,
  //          y: center,
  //        },
  //      );

  //      movableCx.value = newCoords.x;
  //      movableCy.value = newCoords.y;
  //    })
  //    .onEnd(() => {
  //      previousPositionX.value = movableCx.value;
  //      previousPositionY.value = movableCy.value;
  //    });

  //  const style = useAnimatedStyle(() => {
  //    return { height: 200, width: 300, opacity: percentComplete.value };
  //  }, [percentComplete]);

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  //  <GestureHandlerRootView style={styles.container}>
  //  <GestureDetector gesture={gesture}>
  return (
    <Margin grow={4} direction="column" axisDistribution="center" marginStep={1} height={400} width={width}>
      <Stack direction={'column'}>
        <Margin>
          <Text textType={'bodyHeavy1'} color={'primary'}>
            Plan Stats
          </Text>
        </Margin>
        <Margin>
          <Text textType={'bodyRegular2'} color={'primary'}>
            Couch to 5K Challenge
          </Text>
        </Margin>
      </Stack>
      <View style={styles.container}>
        <Canvas style={styles.canvas}>
          <Rect x={0} y={0} width={width} height={height} color={'transparent'} />
          <Path
            path={skiaBackgroundPath}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap={'square'}
            color={'#A1D8FF'}
          />
          <Path
            path={skiaForegroundPath}
            style="stroke"
            strokeWidth={strokeWidth}
            strokeCap={'square'}
            color={'#0066B1'}
            start={0}
            end={0.3}
          />
        </Canvas>
      </View>
    </Margin>
  );
  //  </GestureDetector>
  //</GestureHandlerRootView>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  cursor: {
    backgroundColor: 'green',
  },
  ghost: {
    flex: 2,
    backgroundColor: '#ffe',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
