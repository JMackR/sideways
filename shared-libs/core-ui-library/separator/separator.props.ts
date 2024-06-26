import { BackgroundColors } from '@upward/themes';
export interface SeparatorProps {
  direction?: 'row' | 'column';
  width?: string | number;
  id?: string | number;
  /**
   * Override default separator color
   * @default: background4
   */
  color?: keyof BackgroundColors;
  height?: string | number;
}
