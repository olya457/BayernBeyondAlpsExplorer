import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {EmptyState} from '../components/EmptyState';
import {HeaderBar} from '../components/HeaderBar';
import {LocationCard} from '../components/LocationCard';
import {locations} from '../data/locations';
import {useSavedLocations} from '../hooks/useSavedLocations';
import type {RootStackParamList} from '../navigation/types';

export function SavedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {savedIds, hydrated, removeSaved, clearSaved} = useSavedLocations();

  const savedLocations = useMemo(
    () =>
      savedIds
        .map(id => locations.find(location => location.id === id))
        .filter((location): location is (typeof locations)[number] => Boolean(location)),
    [savedIds],
  );

  if (!hydrated) {
    return (
      <AppScreen scroll={false}>
        <HeaderBar title="Saved" subtitle="Loading" />
        <EmptyState emoji="★" title="Loading saved places" body="Your list is opening." />
      </AppScreen>
    );
  }

  return (
    <AppScreen scroll={savedLocations.length > 0}>
      <HeaderBar
        title="Saved"
        subtitle={`${savedLocations.length} places`}
        rightIcon={savedLocations.length > 0 ? '🗑️' : undefined}
        onRightPress={clearSaved}
      />
      {savedLocations.length === 0 ? (
        <EmptyState
          emoji="☆"
          title="No saved places"
          body="Add places from Explore or Map and they stay here after restart."
        />
      ) : (
        <View>
          {savedLocations.map(location => (
            <LocationCard
              key={location.id}
              location={location}
              compact
              saved
              onToggleSaved={() => removeSaved(location.id)}
              onPress={() => navigation.navigate('LocationDetail', {locationId: location.id})}
            />
          ))}
        </View>
      )}
    </AppScreen>
  );
}
