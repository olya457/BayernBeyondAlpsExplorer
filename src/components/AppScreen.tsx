import React from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import {getHorizontalPadding, getScreenInsets} from '../theme/layout';

type AppScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  withTabPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function AppScreen({
  children,
  scroll = true,
  withTabPadding = true,
  style,
  contentContainerStyle,
}: AppScreenProps) {
  const safeInsets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const insets = getScreenInsets(safeInsets, withTabPadding);
  const horizontalPadding = getHorizontalPadding(width);

  const contentStyle = [
    styles.content,
    {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: horizontalPadding,
    },
    contentContainerStyle,
  ];

  if (!scroll) {
    return <View style={[styles.screen, contentStyle, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={[styles.screen, style]}
      contentContainerStyle={contentStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
});
