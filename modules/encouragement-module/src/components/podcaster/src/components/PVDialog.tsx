import React, { getGlobal } from 'reactn';
import Dialog from 'react-native-dialog';
import { View } from 'react-native';
import { PV } from '../resources';

type DialogButtonProps = {
  bold?: boolean;
  color?: string;
  disabled?: boolean;
  label: string;
  onPress: any;
  testID: string;
};

type DialogDescriptionProps = {
  children: string;
  testID: string;
};

type DialogInputProps = {
  onChangeText: any;
  placeholder: string;
  testID: string;
  value: string;
};

type Props = {
  buttonProps: DialogButtonProps[];
  descriptionProps?: DialogDescriptionProps[];
  inputProps?: DialogInputProps[];
  title: string;
  visible?: boolean;
};

export const PVDialog = (props: Props) => {
  const { buttonProps, descriptionProps = [], inputProps = [], title, visible } = props;

  const textColor = getGlobal().globalTheme.buttonPrimaryText.color;

  const descriptions = descriptionProps.map((props: DialogDescriptionProps) => {
    return (
      <Dialog.Description key={props.testID} style={{ color: textColor }} testID={props.testID}>
        {props.children}
      </Dialog.Description>
    );
  });

  const inputs = inputProps.map((props: DialogInputProps) => {
    return (
      <Dialog.Input
        key={props.testID}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={PV.Colors.gray}
        style={{ backgroundColor: PV.Colors.black, color: textColor }}
        testID={props.testID}
        value={props.value}
        wrapperStyle={{ backgroundColor: PV.Colors.black }}
      />
    );
  });

  const buttons = buttonProps.map((props: DialogButtonProps) => {
    return (
      <Dialog.Button
        accessibilityRole="button"
        bold={!!props.bold}
        color={!!props.color ? props.color : textColor}
        disabled={!!props.disabled}
        key={props.testID}
        label={props.label}
        onPress={props.onPress}
        testID={props.testID}
      />
    );
  });

  return (
    <Dialog.Container
      blurComponentIOS={<View />}
      contentStyle={{ backgroundColor: PV.Colors.grayDarker }}
      visible={!!visible}
    >
      <Dialog.Title style={{ color: textColor }}>{title}</Dialog.Title>
      {descriptions}
      {inputs}
      {buttons}
    </Dialog.Container>
  );
};
