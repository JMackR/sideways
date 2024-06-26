import { LocalSVGSource } from '@upward/core-ui-library';
import { TextColors } from '@upward/themes';
import type Animated from 'react-native-reanimated';

export type LeftButtonIconType = 'back' | 'close' | 'down' | 'arrow' | 'none';
export type RightButtonIconType = 'icon' | 'text' | 'none';
export type SnapPointsType = (number | string)[];
export type BackgroundType = 'transparent' | 'background4' | 'background1';

export interface ModalCardProps {
  /**
   * Disabled the default navigation bar behavior.
   * You are responsible for handling navigation.
   */
  disableDefaultNavigationBar?: boolean;
  disableDownDrag?: boolean;
  headerLogo?: object;
  /**
   * Display the top bar on modal.
   */
  disableModalTopBar?: boolean;
  /**
   * Display a separator under the header.
   */
  enableSeparator?: boolean;

  /**
   * The default title for the card
   */
  title?: string;
  /**
   * The color tint for the navigation items
   */
  navTint?: keyof TextColors;

  /**
   * Whether to show the header radius
   */
  useHeaderRadius?: boolean;

  /**
   * The default left button type
   */
  leftButtonType?: LeftButtonIconType;

  iconHeight?: number;
  iconWidth?: number;
  /**
   * The default right button type
   */
  rightButtonType?: RightButtonIconType;
  /**
   * Callback when the left button is pressed. Always calls internal collapse().
   * Use custom header if you want something more advanced.
   */
  onLeftButtonClick?: () => void;

  /**
   * Callback when the right button is pressed. Always calls internal collapse().
   * Use custom header if you want something more advanced.
   */
  onRightButtonClick?: () => void;
  /**
   * Text for the right button
   */
  rightButtonText?: string;
  rightIcon?: LocalSVGSource;

  /**
   * Click listener for right button
   */
  onRightButtonOnClick?: () => void;

  /**
   * The actual content to display in the card
   */
  content: () => React.ReactElement;

  /**
   * Optional callback
   */
  onOpenStart?: () => void;

  /**
   * Optional callback
   */
  onOpenEnd?: () => void;

  /**
   * Optional callback
   */
  onCloseStart?: () => void;

  /**
   * Optional callback
   */
  onCloseEnd?: () => void;

  /**
   * Callback of the progress from the BottomSheet API.
   * It is a 'raect-reanimated' Animated.Value! Not a regular one!
   */
  callbackProgress?: Animated.Value<number>;

  /**
   * Passthrough:
   * Points for snapping of bottom sheet component. They define distance from bottom of the screen.
   * Might be number or percent (as string e.g. '20%') for points or percents of screen height from bottom.
   *
   * Set your points up in ASCENDING order if you want default close functionality to work.
   * Otherwise collapse will be broken.
   * e.g. [800, 500, 0]
   */
  snapPoints: SnapPointsType;
  /**
   * Passthrough:
   * Determines initial snap point of bottom sheet. Defaults to 0.
   */
  initialSnap?: number;

  /**
   * Whether to collapse the modal when the user presses outside the box.
   */
  collapseOnOutsidePress?: boolean;

  /**
   * Override default background color
   * @note Set the background color transparent to allow blur affect
   * @default: background4
   */
  backgroundType?: BackgroundType;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;

  showShadow?: boolean;
}
