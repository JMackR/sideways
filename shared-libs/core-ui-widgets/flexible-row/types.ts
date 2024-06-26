import type { ToggleProps, ButtonPropsWeb } from '@upward/core-ui-library';

export type FlexibleRowActionType = 'linktext' | 'groupedButton' | 'radio' | 'check' | 'switch' | undefined;
export type FlexibleRowActionProps = string | ButtonPropsWeb | ToggleProps | undefined;
