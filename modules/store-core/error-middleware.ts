import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { error } from './error-slice';
import { setForcedLogout, setGenericError } from '@upward/authentication';
import { AnalyticsDebug, AnalyticsController } from '@upward/analytics';

const authEndpoints = [
  'bioAuthenticate',
  'checkDeviceExists',
  'devSignIn',
  'getPassword',
  'registerUserEmail',
  'resetPhoneNumber',
  'setBiometricEnrolled',
  'signIn',
  'userLookup',
  'checkPhoneExists',
  'addDocuments',
];

export const errorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (isRejectedWithValue(action)) {
      // forcefully logs the user out of the application if a service returns 401 user not authenticated

      if (action.payload.status === 401) {
        dispatch(setForcedLogout(true));
      }

      AnalyticsController.logError(action?.payload, {
        endpoint: action?.meta?.arg.endpointName,
        args: action?.meta?.arg.originalArgs,
      });
      // show generic error screen if status is anything but a 401
      if (action.payload.status !== 401 && !authEndpoints.includes(action?.meta?.arg?.endpointName)) {
        AnalyticsDebug.logError({
          name: action?.meta?.arg?.endpointName,
          message: action?.meta?.arg,
        });
        dispatch(setGenericError(true));
      }
      dispatch(error(action.payload));
    }
    return next(action);
  };
