import React, { createContext } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ModalCardContextProviderProps } from './modal-card-provider-props';

const defaults: ModalCardContextProviderProps = {
  backButton: 'none',
  setBackButton: (_which) => {},
  title: '',
  setTitle: (_title) => {},
  snapPoints: [],
  snapIndex: 0,
  setSnapIndex: (_e) => {},
  setSnapPoints: (_points) => {},
  ref: React.createRef<BottomSheet>(),
  collapse: () => {},
  refSafeSnapTo: (_i) => {},
  testID: '',
  setTestID: (_testID) => {},
};
export const ModalHostContext = createContext(defaults);
