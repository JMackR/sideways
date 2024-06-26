import { useRef } from 'react';
import {
  Animated,
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Flex, Margin, Stack, Text } from '..';

import { useColor, useColorForBackgroundColor, useColorForTextColor, useFont, useMargin } from '@upward/themes/hooks';
import { ms, vs } from '@upward/utilities';
import { ActivityIndicator } from '../activity-indicator';
import { SVG } from '../image';
import { ButtonPropsBase } from './button-props';
import { isJSXElement, isLocalSVGSource, textColorForCurrentButtonType } from './button-shared';

const ANIMATION_DURATION = 100;

const styles = StyleSheet.create({
  button: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  icon: {
    marginRight: 5,
  },
  textContainer: {
    alignSelf: 'center',
    flex: 0,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});

export const Button = (props: ButtonPropsBase) => {
  const {
    onClick,
    onLongClick,
    placeholder,
    title,
    titleColor,
    titleDecoration,
    header,
    subtitle,
    disabled,
    testID,
    leftIcon,
    rightIcon,
    buttonColor,
    buttonType,
    buttonSize,
    onLayout,
    loading,
    centerIcon,
    doNotApplySidePadding,
    onPressHint,
    tint,
    loader,
    weight,
  } = props;

  // invariant(buttonType !== undefined, "Must have button type");

  const { fonts } = useFont();
  const { colors } = useColor();

  const margin = useMargin().baseMargin;
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current;
  const buttonStyles: StyleProp<ViewStyle> = [styles.button];
  const textStyles: StyleProp<TextStyle> = [styles.text];
  const subtitleStyles: StyleProp<TextStyle> = [styles.subtitle];
  const iconStyles: StyleProp<ImageStyle> = [styles.icon];

  const getBackgroundInterpolation = (from: string, to: string) => {
    return backgroundColorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
      extrapolate: 'clamp',
    }) as any;
  };

  const applyBorderStyles = () => {
    switch (buttonType) {
      // NOTE: commented out as current designs have no borders -ls
      default:
      case 'primary':
      case 'text':
      case 'opaque':
      case 'date-picker':
      case 'dark':
        buttonStyles.push({
          borderRadius: ms(10),
        });
        break;
      case 'inverse':
        buttonStyles.push({
          borderWidth: 1,
          borderColor: useColorForTextColor(tint ? tint : 'brand'),
          borderRadius: ms(10),
        });
        break;
      case 'disabled':
        buttonStyles.push({
          borderColor: colors.gray,
          borderRadius: ms(10),
        });
        break;
      case 'floating-button':
        buttonStyles.push({
          borderRadius: ms(8),
        });
        break;
      case 'back-button':
        buttonStyles.push({
          borderRadius: 50,
        });
    }
  };

  const applyBackgroundColorToStyles = () => {
    let bgColor;
    switch (buttonType) {
      default:
      case 'primary':
        bgColor = getBackgroundInterpolation(colors.brand, colors.brand);
        break;
      case 'inverse':
      case 'text':
        bgColor = getBackgroundInterpolation(colors.transparent, colors.transparent);
        break;
      case 'opaque':
      case 'back-button':
        bgColor = getBackgroundInterpolation(colors.opaque, colors.opaque);
        break;
      case 'dark':
        bgColor = getBackgroundInterpolation(colors.altBackground, colors.altBackground);
        break;
      case 'disabled':
        bgColor = getBackgroundInterpolation(colors.gray, colors.gray);
        break;
      case 'date-picker':
        bgColor = getBackgroundInterpolation(useColorForBackgroundColor('brand'), useColorForBackgroundColor('brand'));
        break;
      case 'floating-button':
        bgColor = getBackgroundInterpolation(
          useColorForBackgroundColor(buttonColor!),
          useColorForBackgroundColor(buttonColor!),
        );
    }
    buttonStyles.push({ backgroundColor: bgColor });
  };

  const textColorName = titleColor ? titleColor : textColorForCurrentButtonType(buttonType);
  const textColor = useColorForTextColor(textColorName);

  const applyTextColorStyles = () => {
    textStyles.push({ color: textColor });
    subtitleStyles.push({ color: textColor });
  };

  const applyTextDecorationStyles = () => {
    textStyles.push({ textDecorationLine: titleDecoration });
  };

  const applyTextDimensionStyles = () => {
    switch (buttonSize) {
      case 'large':
        textStyles.push(fonts.bodyMedium1);
        break;
      case 'medium':
        textStyles.push(fonts.bodyMedium2);
        break;
      case 'small':
        textStyles.push(fonts.bodyMedium3);
        break;
      default:
        break;
    }
  };
  const applyButtonDimensionStyles = () => {
    let buttonDimensions;
    switch (buttonSize) {
      default:
        break;
      case 'large':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(57),
        };
        break;
      case 'medium':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(40),
        };
        break;
      case 'small':
        buttonDimensions = {
          paddingHorizontal: margin * vs(4),
          height: ms(32),
        };
        break;
      case 'floating':
        buttonDimensions = {
          padding: margin * vs(4),
        };
        break;
      case 'back':
        buttonDimensions = {
          padding: 6,
        };
    }

    if (doNotApplySidePadding) {
      buttonDimensions = {
        ...buttonDimensions,
        paddingHorizontal: 0,
        minHeight: 30,
      };
    }
    buttonStyles.push(buttonDimensions);
  };

  const startBackgroundColorAnimation = (targetEndValue: number) => {
    requestAnimationFrame(() => {
      Animated.timing(backgroundColorAnimation, {
        toValue: targetEndValue,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
  };

  applyBackgroundColorToStyles();
  applyTextDimensionStyles();
  applyTextColorStyles();
  applyTextDecorationStyles();
  applyBorderStyles();
  applyButtonDimensionStyles();
  const renderLeftIcon = () => {
    let iconJSX;
    if (isJSXElement(leftIcon)) {
      iconJSX = leftIcon;
    } else if (isLocalSVGSource(leftIcon)) {
      iconJSX = (
        <Margin marginRightStep={1}>
          <SVG
            localSVG={{ ...leftIcon, size: { width: 20, height: 20 } }}
            tint={tint ? tint : titleColor}
            testID="LeftIconSVG"
          />
        </Margin>
      );
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const renderCenterIcon = () => {
    let iconJSX;

    if (isJSXElement(centerIcon)) {
      iconJSX = centerIcon;
    } else if (isLocalSVGSource(centerIcon)) {
      iconJSX = <SVG localSVG={{ ...centerIcon }} tint={tint ? tint : titleColor} testID="centerIconSVG" />;
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };
  const renderRightIcon = () => {
    let iconJSX;
    if (isJSXElement(rightIcon)) {
      iconJSX = rightIcon;
    } else if (isLocalSVGSource(rightIcon)) {
      iconJSX = (
        <Margin marginLeftStep={1} crossAxisDistribution="center" axisDistribution="center">
          <SVG
            localSVG={{ ...rightIcon, size: { width: 15, height: 15 } }}
            tint={tint ? tint : titleColor}
            testID="rightIconSVG"
          />
        </Margin>
      );
    } else {
      return undefined;
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>;
  };

  const clickHandler = () => {
    // AnalyticsController.trackClickableEvent({
    //     screenName,
    //     eventName: "Click",
    //     elementName: "Button",
    // });
    requestAnimationFrame(() => {
      if (onClick) {
        onClick();
      }
    });
  };

  const onPressIn = () => {
    startBackgroundColorAnimation(1);
  };

  const onPressOut = () => {
    startBackgroundColorAnimation(0);
  };

  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableWithoutFeedback;
  return (
    <Flex direction={'column'}>
      {header && (
        <Stack direction={'row'}>
          <Margin grow={1} direction={'row'} crossAxisDistribution={'flex-start'} marginBottomStep={2}>
            <Text textType="headerMedium1" testID={`${testID}.header`}>
              {header}
            </Text>
          </Margin>
        </Stack>
      )}

      <Touchable
        accessibilityRole={'button'}
        accessibilityHint={onPressHint}
        testID={testID || 'button'}
        disabled={disabled || loading}
        onPress={clickHandler}
        onLongPress={onLongClick}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        touchSoundDisabled={false}
      >
        {/** TODO: [CFT-490] add activity indicator here */}
        <Animated.View style={[buttonStyles]} onLayout={onLayout}>
          <>
            {leftIcon && renderLeftIcon()}
            {placeholder && (
              <Text textType={weight ? weight : 'bodyMedium1'} testID={'button.placeholder'}>
                {placeholder}
              </Text>
            )}
            {title && (
              <View style={[styles.textContainer, { marginLeft: loader ? -35 : 0 }]}>
                {loader && (
                  <ActivityIndicator size="small" color={textColor} animating={loading} testID="activity-indicator" />
                )}
                {title && (
                  <Text
                    textType={weight ? weight : 'bodyMedium1'}
                    testID={`${testID || 'button'}`}
                    color={textColorName}
                    textDecorationLine={titleDecoration}
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text textType="bodyRegular3" testID={'button.subtitle'} numberOfLines={1}>
                    {subtitle}
                  </Text>
                )}
              </View>
            )}
            {centerIcon && renderCenterIcon()}
            {rightIcon && renderRightIcon()}
          </>
        </Animated.View>
      </Touchable>
    </Flex>
  );
};
