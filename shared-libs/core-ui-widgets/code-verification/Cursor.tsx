import { useState } from 'react';
import { Text } from 'react-native';
import { useInterval } from './useTimer';
import { useColorForTextColor } from '@upward/themes';

export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';

export function Cursor({ cursorSymbol = DEFAULT_CURSOR_SYMBOL, delay = DEFAULT_BLINKING_SPEED }): JSX.Element {
  const [visibleFlag, setFlag] = useState(true);
  const cursorColor = useColorForTextColor('onBackground');
  useInterval(() => setFlag((flag) => !flag), delay);

  // @ts-expect-error `JSX.Element` is not a `ReactNode`
  return visibleFlag ? <Text style={{ color: cursorColor }}>{cursorSymbol}</Text> : '';
}
