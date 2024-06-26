/* eslint-disable max-len */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PV } from '../';

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    style={{
      enableBackground: 'new 0 0 1024 1024',
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path
      style={{
        fill: PV.Colors.ink,
      }}
      d="M.8 0h1022.4v1024.3H.8z"
    />
    <Path
      d="M455.4 768.2c10.4 37.1-15.5 47.9-44.7 47.8l-69.1-244.7c16.3-27.3 55.3-11.9 63.3 16.6l50.5 180.3zm162.7-180.3-50.9 180.3c-10.5 37.1 15.6 47.9 45.1 47.8L682 571.3c-16.5-27.3-55.8-11.9-63.9 16.6zm127.1 118.6c-8.1 44.2-37.5 86.5-81.3 101.9-8.5 3-19.7 5.7-31.3 7.3l66-231.7c14.8 9.2 26.8 22.6 35.2 38.7 17.2-33.7 27-71.9 27-112.3 0-137.2-111.6-248.8-248.8-248.8S263.2 373.2 263.2 510.4c0 40.5 9.8 78.7 27.1 112.5 8.3-16.2 20.2-29.6 34.9-38.9l65.5 231.7c-11.5-1.6-22.5-4.3-31-7.3-43.3-15.3-72.3-57.4-80.5-101.4-45-53.1-72.2-121.7-72.2-196.6 0-168.2 136.8-305 305-305s305 136.8 305 305c0 74.7-27.1 143.1-71.8 196.1z"
      style={{
        fill: PV.Colors.grayDark,
      }}
    />
  </Svg>
);

export default SvgComponent;
