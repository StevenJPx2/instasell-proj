import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: undefined;
  SignIn: undefined;
  SignUp: undefined;
  User: undefined;
  NotFound: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Root'
>;
export type SignInNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;
export type SignUpNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>;
export type UserNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'User'
>;

export type Home = {
  HomeScreen: undefined;
};
