import { Middleware } from '@reduxjs/toolkit';
import { setLoading } from './loading.slice';

const loaders: string[] = [];
export const loadingMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action?.meta?.requestStatus) {
      if (action?.meta?.requestStatus === 'pending') {
        loaders.push(action.meta.arg.endpointName);
        dispatch(setLoading(true));
      }
      if (action.meta.requestStatus === 'fulfilled') {
        const index = loaders.indexOf(action.meta.arg.endpointName);
        loaders.splice(index, 1);
      }
      if (action.meta.requestStatus === 'rejected') {
        const index = loaders.indexOf(action.meta.arg.endpointName);
        loaders.splice(index, 1);
      }
      if (loaders.length < 1) {
        dispatch(setLoading(false));
      }
    }
    next(action);
  };
