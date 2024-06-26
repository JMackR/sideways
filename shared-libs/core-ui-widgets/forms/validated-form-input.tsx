import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ValidatedFormContext } from './validated-form';
import { WithValidatorsProps, isEmpty } from '@upward/utilities';
import { LocalSVGSource, SVG, Input, InputProps } from '@upward/core-ui-library';

export interface ValidatedFormInputProps extends InputProps, Pick<WithValidatorsProps, 'validateOnChange'> {
  roleProp: string;
  style?: object;
  placeholder?: string;
  onSubmitEditing?: any;
  tint?: string;
  trailingIcon?: LocalSVGSource | JSX.Element;
  onClick?: () => void;
}

export const ValidatedInput = (props: ValidatedFormInputProps) => {
  const { roleProp, onSubmitEditing, textChangeHandler } = props;
  const { onSubmit, onChangeValue, value } = useContext(ValidatedFormContext);

  useEffect(() => {
    onChangeValue(roleProp, undefined);
    return () => onChangeValue(roleProp, undefined);
  }, []);

  const onChange = (newValue?: string) => {
    textChangeHandler && textChangeHandler(newValue);
    onChangeValue(roleProp, newValue);
    // Commenting out onChangeValue here because we have it already above(line 18), but leaving
    // in case we have issues with this commented out
  };

  /**
   * with 'done' returnKeyType, do error validation checking when user hits done on keyboard,
   * then proceed to do the actual action
   */
  const onSubmitEditingWithValidation = (finalValue?: string) => {
    if (finalValue) {
      onSubmit().then((errors) => {
        if (isEmpty(errors)) {
          // no errors
          onSubmitEditing && onSubmitEditing(finalValue);
        }
      });
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Input
        {...props}
        text={value[roleProp]}
        textChangeHandler={onChange}
        onSubmitEditing={onSubmitEditingWithValidation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },
});
