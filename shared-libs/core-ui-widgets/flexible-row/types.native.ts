import type { ToggleProps, ButtonPropsNative } from '@upward/core-ui-library';

export type FlexibleRowActionType = 'linktext' | 'radio' | 'check' | 'switch' | 'button' | undefined;
export type FlexibleRowActionProps = string | ButtonPropsNative | ToggleProps | undefined;
