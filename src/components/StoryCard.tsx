import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import type {Story} from '../types/content';

type StoryCardProps = {
  story: Story;
  onPress: () => void;
};

export function StoryCard({story, onPress}: StoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <Image source={story.image} resizeMode="cover" style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.emoji}>{story.emoji}</Text>
        <View style={styles.textWrap}>
          <Text numberOfLines={2} style={styles.title}>
            {story.title}
          </Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {story.subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.panelLine,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.86,
  },
  emoji: {
    fontSize: 26,
    width: 34,
  },
  image: {
    height: 128,
    width: '100%',
  },
  subtitle: {
    color: colors.screenTextMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.screenText,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0,
  },
});
