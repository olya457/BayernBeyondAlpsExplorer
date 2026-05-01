import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {CategoryTabs} from '../components/CategoryTabs';
import {HeaderBar} from '../components/HeaderBar';
import {LocationCard} from '../components/LocationCard';
import {locationCategories, locations} from '../data/locations';
import {useSavedLocations} from '../hooks/useSavedLocations';
import type {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';

export function ExploreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isSaved, toggleSaved} = useSavedLocations();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return locations.filter(location => {
      const matchesCategory = category === 'All' || location.category === category;
      const matchesQuery =
        !normalizedQuery ||
        location.title.toLowerCase().includes(normalizedQuery) ||
        location.short.toLowerCase().includes(normalizedQuery) ||
        location.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <AppScreen>
      <HeaderBar title="Explore" subtitle={`${filtered.length} places`} />
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Bavaria"
          placeholderTextColor={colors.inkSoft}
          autoCorrect={false}
          style={styles.searchInput}
        />
      </View>
      <CategoryTabs
        values={['All', ...locationCategories]}
        selected={category}
        onChange={setCategory}
      />
      <View style={styles.list}>
        {filtered.map(location => (
          <LocationCard
            key={location.id}
            location={location}
            saved={isSaved(location.id)}
            onToggleSaved={() => toggleSaved(location.id)}
            onPress={() => navigation.navigate('LocationDetail', {locationId: location.id})}
          />
        ))}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
  searchInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  searchWrap: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    marginBottom: 14,
    marginTop: 18,
  },
});
