import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {HeaderBar} from '../components/HeaderBar';
import {LocationCard} from '../components/LocationCard';
import {StoryCard} from '../components/StoryCard';
import {featuredLocations, locationCategories, locations} from '../data/locations';
import {stories} from '../data/stories';
import {useSavedLocations} from '../hooks/useSavedLocations';
import type {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {savedIds, isSaved, toggleSaved} = useSavedLocations();
  const heroLocation = featuredLocations[0];

  return (
    <AppScreen>
      <HeaderBar title="Bayern Beyond Alps" subtitle="20 places across Bavaria" />

      <ImageBackground
        source={heroLocation.image}
        resizeMode="cover"
        style={styles.hero}
        imageStyle={styles.heroImage}>
        <View style={styles.heroScrim} />
        <View style={styles.heroContent}>
          <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78} style={styles.heroKicker}>
            {heroLocation.emoji} {heroLocation.category}
          </Text>
          <Text numberOfLines={2} style={styles.heroTitle}>
            {heroLocation.title}
          </Text>
          <Text numberOfLines={2} style={styles.heroText}>
            {heroLocation.short}
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate('LocationDetail', {locationId: heroLocation.id})
            }
            style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Open</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{locations.length}</Text>
          <Text style={styles.statLabel}>Places</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{locationCategories.length}</Text>
          <Text style={styles.statLabel}>Layers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{savedIds.length}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Views</Text>
        <Pressable onPress={() => navigation.navigate('MainTabs', {screen: 'Explore'})}>
          <Text style={styles.sectionAction}>All</Text>
        </Pressable>
      </View>

      {featuredLocations.slice(1, 4).map(location => (
        <LocationCard
          key={location.id}
          location={location}
          compact
          saved={isSaved(location.id)}
          onToggleSaved={() => toggleSaved(location.id)}
          onPress={() => navigation.navigate('LocationDetail', {locationId: location.id})}
        />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bayern Stories</Text>
        <Pressable onPress={() => navigation.navigate('MainTabs', {screen: 'Stories'})}>
          <Text style={styles.sectionAction}>More</Text>
        </Pressable>
      </View>

      {stories.slice(0, 2).map(story => (
        <StoryCard
          key={story.id}
          story={story}
          onPress={() => navigation.navigate('StoryDetail', {storyId: story.id})}
        />
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 238,
    marginTop: 18,
    overflow: 'hidden',
  },
  heroButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    marginTop: 14,
    width: 104,
  },
  heroButtonText: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },
  heroImage: {
    borderRadius: 8,
  },
  heroKicker: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 8,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,26,24,0.38)',
    borderRadius: 8,
  },
  heroText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 286,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 32,
    maxWidth: 290,
  },
  sectionAction: {
    color: colors.active,
    fontSize: 14,
    fontWeight: '900',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 22,
  },
  sectionTitle: {
    color: colors.screenText,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.panelLine,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  statLabel: {
    color: colors.screenTextMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  statValue: {
    color: colors.screenText,
    fontSize: 21,
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
});
