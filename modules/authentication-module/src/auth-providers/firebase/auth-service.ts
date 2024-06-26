// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthServiceModuleShape } from '../AuthServiceModule';
type AuthListener = (user: any) => any | null;

const FireAuth = (fireAuth: typeof auth) => {
  const authService = fireAuth();
  const authStatics = fireAuth;

  const init = () => {
    // TODO Make this only apply in dev mode
    // if testing on real numbers it has be turned off
    //authService.settings.appVerificationDisabledForTesting = false;
    return {
      // currentUser: authService.currentUser,
      // getMultiFactorResolver: (error: string) => authService.getMultiFactorResolver(error),
      // logout: async () => authService.signOut(),
      // fetchSignInMethodsForEmail: (email: string) => authService.fetchSignInMethodsForEmail(email),
      // signInWithEmailAndPass: (email, pass) => {
      //   return authService.signInWithEmailAndPassword(email, pass);
      // },
      // signInWithEmailLink: (email: string, emailLink: string) => authService.signInWithEmailLink(email, emailLink),
      // isSignInWithEmailLink: (link: string) => authService.isSignInWithEmailLink(link),
      // multiFactor: async (currentUser: FirebaseAuthTypes.User) => authService.multiFactor(currentUser),
      // onAuthStateChanged: (listener: AuthListener) => authService.onAuthStateChanged(listener),
      // phoneAuthProvider: authStatics.PhoneAuthProvider,
      // phoneMultiFactorGenerator: authStatics.PhoneMultiFactorGenerator,
      // emailAuthProvider: authStatics.EmailAuthProvider,
      // signInWithPhoneNumber: (phoneNumber: string) => authService.signInWithPhoneNumber(phoneNumber),
      // sendSignInLinkToEmail: (email: string, actionCodeSettings?: any) =>
      //   authService.sendSignInLinkToEmail(email, actionCodeSettings),
      // verifyPhoneNumberWithMultiFactorInfo: (hint: FirebaseAuthTypes.MultiFactorInfo, sessionId: string) =>
      //   authService.verifyPhoneNumberWithMultiFactorInfo(hint, sessionId),
      // verifyPhoneNumberForMultiFactor: (phoneOptions: { phoneNumber: string; session: string }) =>
      //   authService.verifyPhoneNumberForMultiFactor(phoneOptions),
      // verifyPhoneNumber: (phone: string) => authService.verifyPhoneNumber(phone),
      // signInWithCustomToken: (token: string) => authService.signInWithCustomToken(token),
    };
  };
  return init();
};
const Auth = FireAuth(auth);

export default Auth;
