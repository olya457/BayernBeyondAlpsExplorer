import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';

type EmptyStateProps = {
  emoji: string;
  title: string;
  body: string;
};

export function EmptyState({emoji, title, body}: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.screenTextMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 280,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 34,
  },
  title: {
    color: colors.screenText,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 12,
    textAlign: 'center',
  },
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
});
