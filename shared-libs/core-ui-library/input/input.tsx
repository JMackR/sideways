import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackgroundContainer,
  Border,
  Flex,
  InputProps,
  Margin,
  Overlay,
  SVG,
  Stack,
  Text,
  TextEntry,
  TextEntryRef,
} from '..';

import {
  //  BackgroundColors,
  TextColors,
} from '@upward/themes/type-defs';
import { isEmpty } from '@upward/utilities';
import { TouchableOpacity } from 'react-native';
const ICON_SIZE = 30;
const getTint = (props: InputProps, selected: boolean) => {
  const { focusState, error } = props;
  let tint: keyof TextColors;
  // let borderTint: keyof BackgroundColors;
  let currentState = focusState;
  if (currentState === undefined) {
    if (!isEmpty(error)) {
      currentState = 'error';
    } else if (selected) {
      currentState = 'focused';
    } else {
      currentState = 'unfocused';
    }
  }

  switch (currentState) {
    case 'error':
      tint = 'error';
      // borderTint = 'error';
      break;
    case 'focused':
      tint = 'disabled';
      // borderTint = 'inputOutline';
      break;
    case 'unfocused':
    default:
      tint = 'primary';
      // borderTint = 'inputOutline';
      break;
  }

  return { tint };
};
export const Input = forwardRef<TextEntryRef, InputProps>((props, ref) => {
  const {
    title,
    leftHelperText,
    rightHelperText,
    error,
    suppressErrorText,
    leadingIcon,
    trailingIcon,
    loading,
    focusHandler,
    blurHandler,
    toolTipIcon,
    toolTipText,
    testID,
    secureTextEntry,
    onClear,
    text,
    inputDisabled = false,
    maxFontSizeMultiplier = 4.25,
    background,
    borderColor,
    titleTextType,
    onClick,
  } = props;

  const [selected, setSelected] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);
  const { tint } = getTint(props, selected);
  const entryRef = useRef<TextEntryRef>(null);

  const touchEndFunc = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus();
    }
  };

  const focusFunc = () => {
    setSelected(true);
    if (focusHandler !== undefined) {
      focusHandler();
    }
  };

  const blurFunc = () => {
    setSelected(false);
    if (blurHandler !== undefined) {
      blurHandler();
    }
  };

  const focus = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus();
    }
  };

  const blur = () => {
    if (entryRef.current !== null) {
      entryRef.current.blur();
    }
  };

  const setPrivate = () => {
    if (entryRef.current !== null) {
      entryRef.current.setPrivate();
    }
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    setPrivate,
  }));

  useEffect(() => {
    setSecure(secureTextEntry);
  }, [secureTextEntry]);

  const textEntryElement = () => {
    return (
      <TextEntry
        {...props}
        ref={entryRef}
        secureTextEntry={secure}
        focusHandler={focusFunc}
        blurHandler={blurFunc}
        testID={`${testID || 'ucl'}.input.text-entry`}
      />
    );
  };

  const toggleSecure = () => setSecure(!secure);
  return (
    <Flex direction={'row'} grow={1} testID={`${testID || 'ucl'}.input`}>
      <Margin direction={'column'} grow={1}>
        <Stack direction={'column'} childSeparationStep={1}>
          {(title || (toolTipIcon && toolTipText)) && (
            <Flex grow={1} direction={'row'}>
              {title && (
                <Text
                  textType={titleTextType ? titleTextType : 'bodyMedium1'}
                  testID={`${testID || 'basic-controls'}.input.title`}
                  maxFontSizeMultiplier={maxFontSizeMultiplier}
                >
                  {title}
                </Text>
              )}
            </Flex>
          )}
          <BackgroundContainer type={background ? background : 'onBackground'} borderRadius={20} borderColor={borderColor}>
            <Margin direction={'column'} grow={1} marginStep={2}>
              <Stack direction={'row'} crossAxisDistribution={'center'}>
                {leadingIcon && (
                  <Margin
                    direction={'column'}
                    axisDistribution={'center'}
                    crossAxisDistribution={'center'}
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <SVG tint={tint} localSVG={leadingIcon} />
                  </Margin>
                )}

                <Margin grow={1} direction={'column'} axisDistribution={'center'}>
                  {textEntryElement()}
                  {onClear && !!text && (
                    <Overlay insetRightStep={0} insetTopStep={0}>
                      <TouchableOpacity onPress={onClear}>
                        {/* <SVG
                                                            localSVG={
                                                                ActionClear
                                                            }
                                                        /> */}
                      </TouchableOpacity>
                    </Overlay>
                  )}
                  {secureTextEntry && (
                    <Overlay insetRightStep={0}>
                      <TouchableOpacity onPress={toggleSecure}>
                        <Text
                          textType={'bodyMedium1'}
                          color={'primary'}
                          maxFontSizeMultiplier={maxFontSizeMultiplier}
                        >
                          {secure ? 'show' : 'hide'}
                        </Text>
                      </TouchableOpacity>
                    </Overlay>
                  )}
                </Margin>
                {loading && (
                  <Margin
                    direction={'column'}
                    axisDistribution={'center'}
                    crossAxisDistribution={'center'}
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <ActivityIndicator
                      animating={loading}
                      size={'small'}
                      testID={`${testID || 'ucl'}.input.activity-indicator`}
                    />
                  </Margin>
                )}
                {!loading && trailingIcon && (
                  <Margin
                    direction={'column'}
                    axisDistribution={'center'}
                    crossAxisDistribution={'center'}
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <SVG
                      tint={tint}
                      localSVG={{ ...trailingIcon, size: { width: ICON_SIZE, height: ICON_SIZE } }}
                      onPress={onClick}
                    />
                  </Margin>
                )}
              </Stack>
            </Margin>
          </BackgroundContainer>
          {(leftHelperText || rightHelperText) && (
            <Stack direction={'row'} grow={0}>
              {leftHelperText && (
                <Flex direction={'row'} axisDistribution={'flex-start'} grow={1}>
                  <Text
                    textType={'bodyMedium1'}
                    color={'onBackground'}
                    testID={`${testID || 'ucl'}.input.left-helper-text`}
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                  >
                    {leftHelperText}
                  </Text>
                </Flex>
              )}
              {/* This view is between the other two so that they will align around the space correctly if one or the other is not shown. */}
              {rightHelperText && (
                <Flex direction={'row-reverse'} axisDistribution={'flex-start'} grow={1}>
                  <Text
                    textType={'bodyMedium1'}
                    color={'onBackground'}
                    testID={`${testID || 'ucl'}.input.right-helper-text`}
                    maxFontSizeMultiplier={maxFontSizeMultiplier}
                  >
                    {rightHelperText}
                  </Text>
                </Flex>
              )}
            </Stack>
          )}
          {error && !suppressErrorText && (
            <Stack grow={1} childSeparationStep={2} direction={'row'} crossAxisDistribution={'center'}>
              {/* <SVG
                                    localSVG={{
                                        ...ErrorIcon,
                                        size: { width: 10, height: 10 },
                                    }}
                                    tint={"transparent"}
                                /> */}
              <Text
                textType="bodyMedium1"
                color={'onError'}
                testID={`${testID || 'ucl'}.input.error-text`}
                maxFontSizeMultiplier={maxFontSizeMultiplier}
              >
                {error}
              </Text>
            </Stack>
          )}
        </Stack>
      </Margin>
    </Flex>
  );
});
