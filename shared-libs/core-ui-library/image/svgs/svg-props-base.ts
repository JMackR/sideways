import type React from 'react';
import type { Colors, TextColors } from '@upward/themes';

export interface RemoteSVGSource {
  uri: string;
  size: {
    width: number;
    height: number;
  };
}

/**
 * @warning !!!THIS SHOULD NOT BE USED OUTSIDE OF THE SVG COMPONENT!!!
 * An extension on the Colors type to be used when passing color props to
 * the `SVG` member of LocalSVGSource.
 */
export interface SVGColors extends Colors {
  tintColor?: string;
}

export interface LocalSVGSource {
  SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & SVGColors>;
  size?: {
    width: number | string;
    height: number | string;
  };
  type?: string;
  style?: any;
  transform?: any;
  viewBox?: string;
}

export interface SvgPropsBase {
  onPress?(): void;
  onPressHint?: string;
  /**
   * Color of the SVG, choose from entire color collection
   * @default: grey900
   */
  tint?: keyof TextColors;
  remoteSVG?: RemoteSVGSource;
  localSVG?: LocalSVGSource;
  style?: any;
  transform?: any;
  viewBox?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
