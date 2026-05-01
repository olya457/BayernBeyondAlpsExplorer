import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {getFloatingTabBottom, tabBarHeight} from '../theme/layout';
import type {MainTabParamList} from './types';

const tabMeta: Record<keyof MainTabParamList, {emoji: string; label: string}> = {
  Home: {emoji: '🏔️', label: 'Home'},
  Explore: {emoji: '🧭', label: 'Explore'},
  Map: {emoji: '🗺️', label: 'Map'},
  Saved: {emoji: '★', label: 'Saved'},
  Stories: {emoji: '✍️', label: 'Stories'},
};

export function FloatingTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View pointerEvents="box-none" style={[styles.wrap, {bottom: getFloatingTabBottom()}]}>
      <View style={styles.panel}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = tabMeta[route.name as keyof MainTabParamList];
          const descriptor = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityLabel={descriptor.options.tabBarAccessibilityLabel}
              accessibilityRole="button"
              accessibilityState={focused ? {selected: true} : {}}
              onPress={onPress}
              style={styles.item}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Text style={styles.icon}>{meta.emoji}</Text>
              </View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.82}
                style={[styles.label, focused && styles.labelActive]}>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    width: 42,
  },
  iconWrapActive: {
    backgroundColor: colors.active,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
    height: '100%',
    justifyContent: 'center',
    minWidth: 0,
  },
  label: {
    color: colors.inkSoft,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0,
    maxWidth: 58,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.primaryDark,
  },
  panel: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.panelLine,
    borderRadius: 28,
    borderWidth: 1,
    elevation: 12,
    flexDirection: 'row',
    height: tabBarHeight,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.14,
    shadowRadius: 18,
  },
  wrap: {
    left: 18,
    position: 'absolute',
    right: 18,
  },
});
