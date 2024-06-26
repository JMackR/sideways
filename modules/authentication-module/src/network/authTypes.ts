export type SignInTypes = {
  response: string;
};
export type ClientProps = {
  status: string;
  clientList: ClientList[];
  firebaseUser: FirebaseUser;
};
export type ClientList = {
  clientID: number;
  clientName: string;
  userID: number;
  firstName?: string;
  lastName?: string;
};
type FirebaseUser = {
  phoneNumber: string;
  token: string;
};
