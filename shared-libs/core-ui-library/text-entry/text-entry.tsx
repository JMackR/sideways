import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  InputAccessoryView,
  Platform,
  Button,
} from 'react-native';
import { BackgroundContainer, Flex, Margin, Separator } from '..';
import { ComputePropsForTextEntryProps } from './text-entry-shared';
import { TextEntryProps, TextEntryRef } from './text-entry.props';

const isIOS = Platform.OS === 'ios';
const STICKY_KEYBOARD_BAR_HEIGHT = 40;
const RIGHT_MARGIN = 4;
const inputAccessoryViewID = 'stickyDoneBar';

export const TextEntry = forwardRef<TextEntryRef, TextEntryProps>((props, ref) => {
  const {
    text,
    hint,
    inputCharLimit,
    returnKeyType,
    keyboardType,
    secureTextEntry,
    textAlign,
    showSoftInputOnFocus = true,
    keyPressHandler,
    textChangeHandler,
    endEditingHandler,
    blurHandler,
    focusHandler,
    onSubmitEditing,
    testID,
    showInputAccessoryView,
    returnKeyLabel,
    onPressIn,

    styles: stylesCustom,
  } = props;
  const {
    autoCapitalize,
    autoCorrect,
    font,
    minPointHeight,
    maxPointHeight,
    isMultiline,
    primaryColor,
    hintColor,
    tintColor,
  } = ComputePropsForTextEntryProps(props);

  const styles = StyleSheet.create({
    textentry: {
      flex: 0,
      flexDirection: 'row',
      color: primaryColor,
      fontSize: font?.fontSize,
      fontWeight: font?.fontWeight,
      fontFamily: font?.fontFamily,
      margin: 0,
      marginVertical: 8,
      padding: 0,
      minHeight: minPointHeight,
      maxHeight: maxPointHeight,
      alignSelf: 'stretch',
      textAlign,
      textAlignVertical: isMultiline ? 'top' : 'auto',
      ...stylesCustom,
    },
  });

  const [, setHeight] = useState(minPointHeight);
  // const { keyboardAvoidanceFocus, keyboardAvoidanceBlur, generateFocusId } = useKeyboardAvoidanceFocus()
  // const focusIdRef = useRef(generateFocusId())
  const input = useRef<TextInput>(null);

  const keyPressFunc = (e: { nativeEvent: { key: string } }) => {
    if (keyPressHandler !== undefined) {
      keyPressHandler(e.nativeEvent.key);
    }
  };

  const endEditingFunc = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    if (endEditingHandler !== undefined) {
      endEditingHandler(e.nativeEvent.text);
    }
  };
  const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    if (onSubmitEditing) {
      onSubmitEditing(e.nativeEvent.text);
    }
  };

  const contentSizeChangeFunc = (e: { nativeEvent: { contentSize: { width: number; height: number } } }) => {
    setHeight(Math.min(e.nativeEvent.contentSize.height, maxPointHeight));
  };

  const focusFunc = () => {
    // keyboardAvoidanceFocus(focusIdRef.current)

    focusHandler && focusHandler();
  };

  const blurFunc = () => {
    // keyboardAvoidanceBlur(focusIdRef.current)
    blurHandler && blurHandler();
  };

  const focus = () => {
    if (input.current !== null) {
      input.current.focus();
    }
  };

  const blur = () => {
    if (input.current !== null) {
      input.current.blur();
    }
  };

  const setPrivate = () => {
    // if (input.current !== null) {
    //   Instabug.setPrivateView(input.current)
    // }
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    setPrivate,
  }));

  return (
    <>
      <TextInput
        style={styles.textentry}
        ref={input}
        underlineColorAndroid={'transparent'}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        value={text}
        onPressIn={onPressIn}
        maxLength={inputCharLimit}
        multiline={isMultiline}
        onKeyPress={keyPressFunc}
        onEndEditing={endEditingFunc}
        onFocus={focusFunc}
        onBlur={blurFunc}
        onSubmitEditing={handleSubmitEditing}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        showSoftInputOnFocus={showSoftInputOnFocus}
        placeholder={hint}
        returnKeyLabel={returnKeyLabel}
        placeholderTextColor={hintColor}
        cursorColor={tintColor}
        onChangeText={textChangeHandler}
        onContentSizeChange={contentSizeChangeFunc}
        selectionColor={tintColor}
        testID={testID || 'text-entry'}
        accessibilityLabel={testID || 'text-entry'}
        inputAccessoryViewID={inputAccessoryViewID}
      />
      {isIOS && showInputAccessoryView && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <BackgroundContainer type={'secondaryContainer'} isOverlay />
          <Separator />
          <Flex height={STICKY_KEYBOARD_BAR_HEIGHT} crossAxisDistribution={'center'} axisDistribution={'flex-end'}>
            <Margin marginRightStep={RIGHT_MARGIN}>
              <Button onPress={blur} title={'done'} />
            </Margin>
          </Flex>
        </InputAccessoryView>
      )}
    </>
  );
});
