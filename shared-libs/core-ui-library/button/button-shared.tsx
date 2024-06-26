import { TextColors } from '@upward/themes';
import { LocalSVGSource } from '../image';
import { ButtonPropsBase, ButtonType } from './button-props';

export const textColorForCurrentButtonType = (buttonType: ButtonType): keyof TextColors => {
  switch (buttonType) {
    default:
    case 'primary':
      return 'brandAlt';
    case 'inverse':
      return 'brand';
    case 'text':
      return 'primary';
    case 'disabled':
      return 'primary';
    case 'floating-button':
      return 'alwaysLight';
  }
};

// @ts-ignore
export const isJSXElement = (thingToTest: ButtonPropsBase['icon']): thingToTest is JSX.Element =>
  !!thingToTest && (thingToTest as JSX.Element).props !== undefined;

// @ts-ignore
export const isLocalSVGSource = (thingToTest: ButtonPropsBase['icon']): thingToTest is LocalSVGSource =>
  !!thingToTest && (thingToTest as LocalSVGSource).SVG !== undefined;
