import React from 'react';
import { Colors, useColor } from '@upward/themes';
import invariant from 'invariant';
import { SVGPropsWeb } from './svg-props';

interface IndexableColors extends Colors {
  [key: string]: string;
}

const convertObjectKeysToLowercase = (obj: IndexableColors) => {
  const keys = Object.keys(obj);
  let n = keys.length;
  const convertedObject: { [key: string]: string } = {};
  while (n--) {
    const key = keys[n];
    convertedObject[key.toLowerCase()] = obj[key];
  }
  return convertedObject;
};

export const SVG = (props: SVGPropsWeb) => {
  const { remoteSVG, localSVG, tint, onPress, className } = props;
  invariant(remoteSVG || localSVG, "'localSVG' or 'remoteSVG' are required for SVG to operate correctly");

  const { colors } = useColor();
  const iconTintColor = (colors as any)[tint || 'brand'];

  if (remoteSVG) {
    invariant(tint === undefined, `The property "tint" is not supported for remoteSVGs: ${JSON.stringify(tint)}`);
    const { size, uri } = remoteSVG;
    return <img src={uri} style={{ ...size }} onClick={onPress} />;
  }
  // React and React-Native diverge in how they handle props be forwarded to potential DOM elements.
  // Below, we are forwarding all of these colors to the SVG tag to use their dynamic values.
  // React.js requires that these props all be lowercase.
  // https://reactjs.org/warnings/unknown-prop.html
  const convertedColors = convertObjectKeysToLowercase(colors as IndexableColors) as IndexableColors;
  convertedColors.tintcolor = iconTintColor;
  const { SVG: SVGR, size } = localSVG!;
  return (
    <SVGR {...size} {...convertedColors} fill={convertedColors.tintcolor} className={className} onClick={onPress} />
  );
};
