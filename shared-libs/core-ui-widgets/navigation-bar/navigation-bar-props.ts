import type { LocalSVGSource } from '@upward/core-ui-library';
import type { TextColors, TextTypes, BackgroundColors } from '@upward/themes';
import { ButtonSize, ButtonType } from '@upward/core-ui-library/button';

export interface NavigationBarItem {
  title?: string;
  avatar?: boolean;
  name?: string;
  imageUrl?: string;
  image?: object;
  colorTint?: string;
  icon?: LocalSVGSource;
  pressHandler?: () => Promise<void>;
  textType?: keyof TextTypes;
  button?: boolean;
  buttonTitle?: string;
  buttonType?: ButtonType;
  buttonSize?: ButtonSize;
  /**
   * A color tint that takes precedence over the navigation bar's `barItemsTint` prop.
   * @default 'brand'
   */
  tint?: keyof TextColors;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
export interface ButtonItem {
  icon?: LocalSVGSource;
  pressHandler?: () => Promise<void>;
  textType?: keyof TextTypes;
  button?: boolean;
  buttonTitle?: string;
  buttonType?: ButtonType;
  buttonSize?: ButtonSize;
  /**
   * A color tint that takes precedence over the navigation bar's `barItemsTint` prop.
   * @default 'brand'
   */
  tint?: keyof TextColors;
}
/**
 * TODO bring back in the required colorTint prop
 */
export interface NavigationBarProps {
  rightButton?: ButtonItem;
  progress?: () => void;
  brandLogo?: object;
  title?: string;
  isMain?: boolean;
  textType?: keyof TextTypes;
  image?: object;
  colorTint?: string;
  showCurve?: boolean;
  animatedCurveStyle?: unknown;
  animatedHeaderStyle?: unknown;
  animatedHeaderHeight?: unknown;
  animatedTitleStyle?: unknown;
  /**
   * Override the background color.
   * @default 'background1'
   */
  backgroundColor?: keyof BackgroundColors;
  leftItems?: NavigationBarItem[];
  rightItems?: NavigationBarItem[];
  isRootNavBar?: boolean;
  /**
   * A color tint that applies to all navigation bar items.
  //  * @default 'primary3'
   */
  barItemsTint?: keyof TextColors;
  showShadow?: boolean;
  titleContainerStyle?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  rotateIcon?: string;
}
