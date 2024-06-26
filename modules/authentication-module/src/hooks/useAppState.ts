import React from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Bind actions to on app state change with clear up
 * @param onActive the function to be called when app becomes active
 * @param onInactive the function to be called when the app becomes in active but not in background yet
 * @param onBackground the function to be called when the app goes into background
 */
export const useAppState = (onActive?: () => void, onInactive?: () => void, onBackground?: () => void) => {
  React.useEffect(() => {
    const onAppStateChanged = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        if (onActive) onActive();
      } else if (nextAppState === 'inactive') {
        if (onInactive) onInactive();
      } else if (nextAppState === 'background') {
        if (onBackground) onBackground();
      }
    };
    const subscription = AppState.addEventListener('change', onAppStateChanged);
    return () => {
      subscription.remove();
    };
  }, [onActive, onInactive, onBackground]);
};
