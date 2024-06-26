import React from 'react';
import { StyleSheet, Platform, StyleProp, Switch, ViewStyle } from 'react-native';
import { useColor, } from '@upward/themes';
import { Flex, Margin, Stack, Text } from '@upward/core-ui-library';


export interface ToggleProps {
  disabled?: boolean;
  onChange: (state: boolean) => void;
  state: boolean;
  activeText?: string;
  inActiveText?: string;
  label1?: string;
  label2?: string;
  title?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;

  /**
   * Used to provide screen readers context
   */
  accessibilityText?: string;
}

export const Toggle = (props: ToggleProps) => {
  const { disabled, onChange, state, title, testID } = props;
  const { colors } = useColor();

  const backgroundColor = Platform.OS === 'ios' ? colors.brand : colors.brand;
  const thumbColor = Platform.OS === 'ios' ? undefined : colors.white;
  const borderStyles: StyleProp<ViewStyle> =
    Platform.OS === 'ios' && state === true
      ? {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.transparent,
      }
      : undefined;

  const onValueChange = (value: boolean): void => {
    onChange(value);
  };
  return (
    <Flex direction="row" grow={1} testID={(testID || 'clt-ucl') + '.toggle'}>
      <Margin direction="column" grow={0} marginLeftStep={2}>
        <Stack direction="column" childSeparationStep={2} crossAxisDistribution={'center'}>
          {title && (
            <Flex grow={1} direction="row">
              {title && (
                <Text textType="bodyRegular1" testID={(testID || 'clt-ucl') + '.input.title'}>
                  {title}{' '}
                </Text>
              )}
            </Flex>
          )}
          <Margin grow={1}>
            <Switch
              trackColor={{ false: backgroundColor, true: colors.brand }}
              ios_backgroundColor={colors.transparent}
              thumbColor={!state ? thumbColor : colors.white}
              onValueChange={onValueChange}
              value={state}
              disabled={disabled}
              style={borderStyles}
              testID={testID || 'clt-ucl.toggle'}
            />
          </Margin>
        </Stack>
      </Margin>
    </Flex>
  );
};
