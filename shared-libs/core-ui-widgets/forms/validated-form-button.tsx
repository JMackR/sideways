// @ts-nocheck
import { ValidatedFormContext } from './validated-form';
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native';
import { isEmpty } from '@upward/utilities';
import React, { FC, forwardRef, useContext, useState } from 'react';
import { Button } from '@upward/core-ui-library';
import { ButtonSize, ButtonType, ButtonPropsBase } from '@upward/core-ui-library/button';

export const ValidatedFormButton: FC<
  ButtonPropsBase & {
    onLayout?: (event: LayoutChangeEvent) => void;
    /**
     * Handler to be called when the user taps the button
     */
    onPress: () => void;
    onLongPress?: () => Promise<void>;
    title?: string;
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined;
    loading?: boolean;
    disabled?: boolean;
    testID?: string;
    style?: ViewStyle;
    labelStyle?: TextStyle;
  }
> = forwardRef((props, ref) => {
  const { title, onPress, disabled: propsDisabled, mode, loading: propsLoading, testID, labelStyle, style } = props;
  const [loading, setLoading] = useState(false);
  const { onSubmit, error } = useContext(ValidatedFormContext);

  const onClick = async () => {
    try {
      // Prevent double click
      if (propsLoading) {
        return;
      }

      setLoading(true);
      const err = await onSubmit();
      if (!isEmpty(err)) {
        return;
      }

      onPress();
    } catch (error) {
      console.log('Onclick error', error);
    }
  };

  const hasError = !isEmpty(error);
  const disabled = propsDisabled || hasError;

  return <Button testID={testID} {...props} disabled={disabled} onClick={onPress} loading={propsLoading} ref={ref} />;
});
