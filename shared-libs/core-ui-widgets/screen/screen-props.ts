import type { ScreenProviderProps } from './provider/screen-provider.props';

export interface ScreenProps extends ScreenProviderProps {
  children: React.ReactNode;
  safeAreaMode: 'top' | 'bottom' | 'all' | 'none';
  /**
   * Optionally override default background color
   */
  backgroundColor?: string;
  /**
   * Optionally override default background color
   */
  statusBarBackgroundColor?: string;
  forceStatusBarTint?: 'light' | 'dark';
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  debugScreen?: boolean;
  dismissKeyboardOnTap?: boolean;
  screenName?: string;
  /**
   * Android keyboard avoidance mode, "windowSoftInputMode"
   */
  androidSoftInputMode?: 'adjustPan' | 'adjustResize' | 'adjustNothing';
  onFocus?: () => void;
  onBlur?: () => void;
  hidden?: boolean;
  /**
   * @default: false
   */
  useStatusBarBackground?: boolean;
  barStyle?: 'light-content' | 'dark-content';
}
