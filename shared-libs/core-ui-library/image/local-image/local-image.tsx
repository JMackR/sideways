import { FC } from 'react';
import invariant from 'invariant';
import { LocalImageProps } from './local-image-props';

export const LocalImage: FC<LocalImageProps> = () => {
  invariant(false, 'LocalImage is only for native.');
  return <></>;
};
