import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {EmptyState} from '../components/EmptyState';
import {HeaderBar} from '../components/HeaderBar';
import {stories} from '../data/stories';
import type {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

export function StoryDetailScreen({navigation, route}: Props) {
  const story = stories.find(item => item.id === route.params.storyId);

  if (!story) {
    return (
      <AppScreen withTabPadding={false} scroll={false}>
        <HeaderBar title="Story" leftIcon="‹" onLeftPress={navigation.goBack} />
        <EmptyState emoji="✍️" title="Story not found" body="This story is unavailable." />
      </AppScreen>
    );
  }

  return (
    <AppScreen withTabPadding={false}>
      <HeaderBar title="Story" leftIcon="‹" onLeftPress={navigation.goBack} />
      <Image source={story.image} resizeMode="cover" style={styles.image} />
      <Text style={styles.emoji}>{story.emoji}</Text>
      <Text numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.8} style={styles.title}>
        {story.title}
      </Text>
      <Text style={styles.subtitle}>{story.subtitle}</Text>
      <Text style={styles.content}>{story.content}</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    color: colors.screenTextMuted,
    fontSize: 16,
    lineHeight: 25,
    marginTop: 20,
  },
  emoji: {
    fontSize: 30,
    marginTop: 18,
  },
  image: {
    backgroundColor: colors.sky,
    borderRadius: 8,
    height: 220,
    marginTop: 18,
    width: '100%',
  },
  subtitle: {
    color: colors.active,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: 10,
  },
  title: {
    color: colors.screenText,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 37,
    marginTop: 8,
  },
});
