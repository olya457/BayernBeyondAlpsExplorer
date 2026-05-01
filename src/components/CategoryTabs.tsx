import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {colors} from '../theme/colors';

type CategoryTabsProps = {
  values: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function CategoryTabs({values, selected, onChange}: CategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {values.map(value => {
        const active = value === selected;

        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={[styles.tab, active && styles.tabActive]}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              style={[styles.label, active && styles.labelActive]}>
              {value}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingRight: 8,
  },
  label: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
  },
  labelActive: {
    color: colors.primaryDark,
  },
  tab: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  tabActive: {
    backgroundColor: colors.active,
    borderColor: colors.primary,
  },
});
