import {Platform} from 'react-native';
import type {EdgeInsets} from 'react-native-safe-area-context';

export const tabBarHeight = 72;
export const androidEdgeInset = 30;
export const iosTabBottomInset = 20;

export const getFloatingTabBottom = () =>
  Platform.OS === 'android' ? androidEdgeInset : iosTabBottomInset;

export const getScreenInsets = (insets: EdgeInsets, withTabPadding: boolean) => {
  const top = Platform.OS === 'android' ? Math.max(insets.top, androidEdgeInset) : insets.top;
  const bottom = Platform.OS === 'android' ? androidEdgeInset : Math.max(insets.bottom, 20);
  const paddedBottom = withTabPadding
    ? tabBarHeight + getFloatingTabBottom() + 24
    : bottom;

  return {
    top,
    bottom: paddedBottom,
    baseBottom: bottom,
  };
};

export const getHorizontalPadding = (width: number) => {
  if (width < 360) {
    return 16;
  }

  if (width > 700) {
    return 32;
  }

  return 20;
};
