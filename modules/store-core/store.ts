import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api';
import { errorMiddleware } from './error-middleware';
import { loadingMiddleware } from './loading-middleware';
import errorReducer from './error-slice';
import AsyncLoadingReducer from './loading.slice';
import { AuthReducer } from '@upward/authentication';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrainingReducer } from '@upward/training';
import { UserReducer } from '@upward/user';
import initialSlice from './initialSlice';

const rootPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  select: persistReducer(rootPersistConfig, initialSlice),
  auth: AuthReducer,
  asyncLoading: AsyncLoadingReducer,
  apiError: errorReducer,
  activity: persistReducer(rootPersistConfig, TrainingReducer),
  user: persistReducer(rootPersistConfig, UserReducer),
});

export const createStore = (options?: ConfigureStoreOptions['preloadedState']) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(api.middleware)
        .concat(errorMiddleware)
        .concat(loadingMiddleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
