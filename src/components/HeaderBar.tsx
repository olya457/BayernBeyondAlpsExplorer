import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';

type HeaderBarProps = {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  rightActive?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export function HeaderBar({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  rightActive,
  onLeftPress,
  onRightPress,
}: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.actionSlot}>
        {leftIcon ? (
          <Pressable onPress={onLeftPress} style={styles.iconButton} hitSlop={10}>
            <Text style={styles.iconText}>{leftIcon}</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.titleWrap}>
        <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.82} style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.actionSlot}>
        {rightIcon ? (
          <Pressable
            onPress={onRightPress}
            style={[styles.iconButton, rightActive && styles.iconButtonActive]}
            hitSlop={10}>
            <Text style={styles.iconText}>{rightIcon}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    minHeight: 48,
  },
  actionSlot: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  iconButtonActive: {
    backgroundColor: colors.active,
    borderColor: colors.primary,
  },
  iconText: {
    fontSize: 20,
  },
  subtitle: {
    color: colors.screenTextMuted,
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
  },
  title: {
    color: colors.screenText,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0,
    textAlign: 'center',
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
});
