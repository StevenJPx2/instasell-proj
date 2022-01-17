import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Swipe: undefined;
  NotFound: undefined;
};

export type RootNavigationProps = StackScreenProps<RootStackParamList, "Root">;
export type SignInNavigationProps = StackScreenProps<
  RootStackParamList,
  "SignIn"
>;
export type SignUpNavigationProps = StackScreenProps<
  RootStackParamList,
  "SignUp"
>;
export type SwipeNavigationProps = StackScreenProps<
  RootStackParamList,
  "Swipe"
>;

export type Home = {
  HomeScreen: undefined;
};
