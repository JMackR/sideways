import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {
  COOKIE,
  ANTIFORGERY_TOKEN,
  UNIQUE_USER,
  MOBILE_AUTHENTICATE,
  GENERATE_FIREBASE_PASSWORD,
  BIOMETRIC_ENROLL,
  CHECK_DEVICE_EXISTS,
  BIOMETRIC_AUTHENTICATE,
  GET_ANTIFORGERY_TOKEN,
  GET_CLIENT_SETTINGS,
  PARTITION,
  FIREBASE_VERIFICATION_EMAIL,
  FIREBASE_RESET_PHONE,
  GET_MOBILE_APPLICATION_SETTINGS,
  PHONE_EXISTS,
} from '@upward/store';
import { api } from '@upward/store/api';
import { parseClientSettings, parseDeviceExists, parseErrorResponse, parsePassword } from './authTransformer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ClientProps } from './authTypes';
export type SignInTypes = {
  token: string;
  email: string;
};

export const tagTypes = ['User', 'Client Settings'];

export const authApi = api.enhanceEndpoints({ addTagTypes: tagTypes }).injectEndpoints({
  endpoints: (build) => ({
    userLookup: build.query<ClientProps, string>({
      query(email) {
        return {
          url: `${Config.BASE_URL}api/mobile/getUser?uniqueUserValue=${email}`,
          method: 'GET',
          extraOptions: {
            serviceName: UNIQUE_USER,
          },
        };
      },
      providesTags: (_user: any, _err: any, id: any) => [{ type: 'User', id }],
      transformResponse: (response: ClientProps) => {
        return response;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        return parseErrorResponse(error);
      },
    }),
    checkPhoneExists: build.query<boolean, { phoneNumber: string; email: string }>({
      query({ phoneNumber, email }) {
        return {
          url: `${Config.BASE_URL}api/mobile/duplicatePhoneExists`,
          method: 'POST',
          body: {
            phoneNumber: phoneNumber,
            email: email,
          },
          extraOptions: {
            serviceName: PHONE_EXISTS,
          },
        };
      },
      providesTags: (_user: any, _err: any, id: any) => [{ type: 'User', id }],
      transformResponse: (response: boolean) => {
        return response;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        return parseErrorResponse(error);
      },
    }),
    registerUserEmail: build.query<string, string>({
      query(email) {
        return {
          url: `${Config.BASE_URL}api/mobile/sendFirebaseLogInVerificationEmail?email=${email}`,
          method: 'POST',
          extraOptions: {
            serviceName: FIREBASE_VERIFICATION_EMAIL,
          },
        };
      },
      providesTags: (_user: any, _err: any, id: any) => [{ type: 'User', id }],
      transformErrorResponse: (error) => {
        return error;
      },
    }),
    resetPhoneNumber: build.query<string, { uid: string; phone: string }>({
      query({ uid, phone }) {
        return {
          url: `${Config.BASE_URL}api/mobile/ResetFirebaseUserPhoneNumber`,
          method: 'POST',
          body: {
            Uid: uid,
            PhoneNumber: phone,
          },
          extraOptions: {
            serviceName: FIREBASE_RESET_PHONE,
          },
        };
      },
      providesTags: (_user: any, _err: any, id: any) => [{ type: 'User', id }],
      transformErrorResponse: (error) => {
        return error;
      },
    }),
    signIn: build.mutation<number, { token: string; email: string; ClientID: number; userID: number }>({
      query: ({ token, email, ClientID, userID }) => {
        return {
          url: `${Config.BASE_URL}api/mobile/authenticate`,
          method: 'POST',
          body: {
            uniqueUserValue: email,
            token: token,
            ClientID: ClientID,
            userID: userID,
          },
          extraOptions: {
            serviceName: MOBILE_AUTHENTICATE,
          },
        };
      },
      transformResponse: (_, meta: any) => {
        const cookie = meta?.response?.headers.get('Set-Cookie');
        const partition = cookie?.match('bswiftpartition=([^;]*)');
        if (cookie) {
          const authData = { cookie: cookie };
          AsyncStorage.setItem(COOKIE, JSON.stringify(authData));
          AsyncStorage.setItem(PARTITION, JSON.stringify(partition));
        }
        getAntiForgeryToken();
        return meta.response.status;
      },
      transformErrorResponse: (error) => {
        //TODO add parser to return message only
        return error;
      },
      invalidatesTags: [{ type: 'User' }],
    }),
    getPassword: build.query<string, string>({
      query(uid) {
        return {
          url: `${Config.BASE_URL}api/mobile/generateFireBasePassword?uid=${uid}`,
          method: 'GET',
          extraOptions: {
            serviceName: GENERATE_FIREBASE_PASSWORD,
          },
        };
      },
      providesTags: (_user: any, _err: any, id: any) => [{ type: 'User', id }],
      transformResponse: (response: string) => {
        return parsePassword(response);
      },
      transformErrorResponse: (error) => {
        //TODO add parser to return message only
        return error;
      },
    }),
    getClientSettings: build.query({
      query() {
        return {
          url: `${Config.BASE_URL}api/mobile/getMobileMetaData`,
          method: 'GET',
          extraOptions: {
            serviceName: GET_CLIENT_SETTINGS,
          },
        };
      },
      providesTags: (_user: any, _err: any) => [{ type: 'Client Settings' }],
      transformResponse: (response: any) => {
        return parseClientSettings(response);
      },
      transformErrorResponse: (error) => {
        //TODO add parser to return message only
        return error;
      },
    }),
    getMobileApplicationSettings: build.query({
      query() {
        return {
          url: `${Config.BASE_URL}api/mobile/getMobileApplicationSettings`,
          method: 'GET',
          extraOptions: {
            serviceName: GET_MOBILE_APPLICATION_SETTINGS,
          },
        };
      },
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (error) => {
        //TODO add parser to return message only
        return error;
      },
    }),
    setBiometricEnrolled: build.mutation<null, { deviceID: string; token: string }>({
      query: ({ deviceID, token }) => {
        return {
          url: `${Config.BASE_URL}api/mobile/biometric/enroll`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            requestToken: token,
          },
          body: {
            deviceID: deviceID,
          },
          extraOptions: {
            serviceName: BIOMETRIC_ENROLL,
          },
        };
      },
      invalidatesTags: [{ type: 'User' }],
    }),
    checkDeviceExists: build.mutation<string, { deviceID: string }>({
      query: ({ deviceID }) => {
        return {
          url: `${Config.BASE_URL}api/mobile/biometric/check-device-exists`,
          method: 'POST',
          body: {
            deviceID: deviceID,
          },
          extraOptions: {
            serviceName: CHECK_DEVICE_EXISTS,
          },
        };
      },
      transformResponse: (response: string) => {
        return parseDeviceExists(response);
      },
      transformErrorResponse: (error: any) => {
        return parseErrorResponse(error);
      },
      invalidatesTags: [{ type: 'User' }],
    }),
    bioAuthenticate: build.mutation<unknown, { deviceID: string; token: string }>({
      query: ({ deviceID, token }) => {
        return {
          url: `${Config.BASE_URL}api/mobile/biometric/authenticate`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            uniqueUserValue: deviceID,
            token: token,
          },
          extraOptions: {
            serviceName: BIOMETRIC_AUTHENTICATE,
          },
        };
      },
      transformResponse: (_, meta) => {
        const cookie = meta?.response?.headers.get('Set-Cookie');
        const partition = cookie?.match('bswiftpartition=([^;]*)');
        if (cookie) {
          const authData = { cookie: cookie };
          AsyncStorage.setItem(COOKIE, JSON.stringify(authData));
          AsyncStorage.setItem(PARTITION, JSON.stringify(partition));
        }
        getAntiForgeryToken();
        return meta?.response?.status;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        return parseErrorResponse(error);
      },
      invalidatesTags: [{ type: 'User' }],
    }),
    devSignIn: build.mutation<any, { companyCode: string; username: string; password: string }>({
      query: ({ companyCode, username, password }) => {
        return {
          url: `${Config.BASE_URL}api/login/loginuser`,
          method: 'POST',
          body: {
            abbrev: companyCode,
            username: username,
            password: password,
            logintype: 1,
            requestedRole: 2,
          },
          extraOptions: {
            serviceName: MOBILE_AUTHENTICATE,
          },
        };
      },
      transformResponse: (_, meta) => {
        const cookie = meta?.response?.headers.get('Set-Cookie');
        const partition = cookie?.match('bswiftpartition=([^;]*)');
        if (cookie) {
          const authData = { cookie: cookie };
          AsyncStorage.setItem(COOKIE, JSON.stringify(authData));
          AsyncStorage.setItem(PARTITION, JSON.stringify(partition));
        }

        return meta?.response?.status;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        return error;
      },
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
  overrideExisting: true,
});

const getAntiForgeryToken = async () => {
  const endpoint = 'api/manageuser/getantiforgerytoken';
  const token = await callService({
    method: 'GET',
    serviceName: GET_ANTIFORGERY_TOKEN,
    url: `${Config.BASE_URL}${endpoint}`,
  });
  AsyncStorage.setItem(ANTIFORGERY_TOKEN, token);
};

export const callService = (props: Props) => {
  const { body, headers, method, url } = props;
  return fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    method,
    credentials: 'include',
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const {
  endpoints,
  useLazyResetPhoneNumberQuery,
  useLazyRegisterUserEmailQuery,
  useLazyUserLookupQuery,
  useLazyCheckPhoneExistsQuery,
  useSignInMutation,
  useBioAuthenticateMutation,
  useCheckDeviceExistsMutation,
  useLazyGetPasswordQuery,
  useSetBiometricEnrolledMutation,
  useGetClientSettingsQuery,
  useGetMobileApplicationSettingsQuery,
  useDevSignInMutation,
} = authApi;
