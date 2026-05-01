import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {EmptyState} from '../components/EmptyState';
import {HeaderBar} from '../components/HeaderBar';
import {locations} from '../data/locations';
import {useSavedLocations} from '../hooks/useSavedLocations';
import type {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetail'>;

export function LocationDetailScreen({navigation, route}: Props) {
  const {isSaved, toggleSaved} = useSavedLocations();
  const location = locations.find(item => item.id === route.params.locationId);

  if (!location) {
    return (
      <AppScreen withTabPadding={false} scroll={false}>
        <HeaderBar title="Place" leftIcon="‹" onLeftPress={navigation.goBack} />
        <EmptyState emoji="🧭" title="Place not found" body="This location is unavailable." />
      </AppScreen>
    );
  }

  const saved = isSaved(location.id);

  return (
    <AppScreen withTabPadding={false}>
      <HeaderBar
        title="Place"
        subtitle={location.category}
        leftIcon="‹"
        rightIcon={saved ? '★' : '☆'}
        rightActive={saved}
        onLeftPress={navigation.goBack}
        onRightPress={() => toggleSaved(location.id)}
      />
      <Image source={location.image} resizeMode="cover" style={styles.image} />
      <View style={styles.titleBlock}>
        <Text style={styles.category}>
          {location.emoji} {location.category}
        </Text>
        <Text numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.8} style={styles.title}>
          {location.title}
        </Text>
        <Text style={styles.short}>{location.short}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoCell}>
          <Text style={styles.infoLabel}>Latitude</Text>
          <Text style={styles.infoValue}>{location.coordinates.latitude.toFixed(4)}</Text>
        </View>
        <View style={styles.infoCell}>
          <Text style={styles.infoLabel}>Longitude</Text>
          <Text style={styles.infoValue}>{location.coordinates.longitude.toFixed(4)}</Text>
        </View>
      </View>
      <Text style={styles.body}>{location.long}</Text>
      <Pressable
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Map',
            params: {locationId: location.id},
          })
        }
        style={styles.mapButton}>
        <Text style={styles.mapButtonText}>🗺️ Open Map</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    color: colors.screenTextMuted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
  },
  category: {
    color: colors.active,
    fontSize: 13,
    fontWeight: '900',
  },
  image: {
    backgroundColor: colors.sky,
    borderRadius: 8,
    height: 230,
    marginTop: 18,
    width: '100%',
  },
  infoCell: {
    backgroundColor: colors.panel,
    borderColor: colors.panelLine,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 13,
  },
  infoLabel: {
    color: colors.screenTextMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  infoValue: {
    color: colors.screenText,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },
  mapButton: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    marginTop: 22,
  },
  mapButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  short: {
    color: colors.screenTextMuted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  title: {
    color: colors.screenText,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 35,
    marginTop: 7,
  },
  titleBlock: {
    marginTop: 18,
  },
});
