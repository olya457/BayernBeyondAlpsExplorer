import type {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Map: {locationId?: string} | undefined;
  Saved: undefined;
  Stories: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  LocationDetail: {locationId: string};
  StoryDetail: {storyId: string};
};
