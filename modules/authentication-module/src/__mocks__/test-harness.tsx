import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
// other imports

const mockStore = configureStore([]);
const store = mockStore({
  // Mocked store state
});

export interface TestHarnessProps {
  children: ReactNode;
}

export const Testharness = (props: TestHarnessProps) => {
  return <Provider store={store} children={props.children}></Provider>;
};
