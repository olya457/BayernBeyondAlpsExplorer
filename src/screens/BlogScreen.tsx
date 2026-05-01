import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {HeaderBar} from '../components/HeaderBar';
import {StoryCard} from '../components/StoryCard';
import {stories} from '../data/stories';
import type {RootStackParamList} from '../navigation/types';

export function BlogScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <AppScreen>
      <HeaderBar title="Bayern Stories" subtitle={`${stories.length} essays`} />
      <View style={styles.list}>
        {stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            onPress={() => navigation.navigate('StoryDetail', {storyId: story.id})}
          />
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 18,
  },
});
