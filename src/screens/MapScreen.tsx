import {useNavigation} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {locations} from '../data/locations';
import {useSavedLocations} from '../hooks/useSavedLocations';
import type {MainTabParamList, RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {
  getFloatingTabBottom,
  getHorizontalPadding,
  getScreenInsets,
  tabBarHeight,
} from '../theme/layout';

type Props = BottomTabScreenProps<MainTabParamList, 'Map'>;

export function MapScreen({route}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isSaved, toggleSaved} = useSavedLocations();
  const [selectedId, setSelectedId] = useState(route.params?.locationId ?? locations[0].id);
  const safeInsets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const insets = getScreenInsets(safeInsets, true);
  const horizontalPadding = getHorizontalPadding(width);

  useEffect(() => {
    if (route.params?.locationId) {
      setSelectedId(route.params.locationId);
    }
  }, [route.params?.locationId]);

  const selectedLocation = useMemo(
    () => locations.find(location => location.id === selectedId) ?? locations[0],
    [selectedId],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 48.48,
          longitude: 11.75,
          latitudeDelta: 3.65,
          longitudeDelta: 4.65,
        }}>
        {locations.map(location => {
          const active = location.id === selectedLocation.id;

          return (
            <Marker
              key={location.id}
              coordinate={location.coordinates}
              onPress={() => setSelectedId(location.id)}>
              <View style={[styles.marker, active && styles.markerActive]}>
                <Text style={styles.markerText}>{location.emoji}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View
        pointerEvents="box-none"
        style={[
          styles.topOverlay,
          {
            paddingTop: insets.top,
            paddingHorizontal: horizontalPadding,
          },
        ]}>
        <View style={styles.mapHeader}>
          <View>
            <Text style={styles.mapTitle}>Map</Text>
            <Text style={styles.mapSubtitle}>{locations.length} Bavaria markers</Text>
          </View>
          <Text style={styles.mapEmoji}>🗺️</Text>
        </View>
      </View>

      <View
        style={[
          styles.preview,
          {
            bottom: tabBarHeight + getFloatingTabBottom() + 14,
            left: horizontalPadding,
            right: horizontalPadding,
          },
        ]}>
        <View style={styles.previewText}>
          <Text numberOfLines={1} style={styles.previewTitle}>
            {selectedLocation.emoji} {selectedLocation.title}
          </Text>
          <Text numberOfLines={2} style={styles.previewShort}>
            {selectedLocation.short}
          </Text>
        </View>
        <View style={styles.previewActions}>
          <Pressable
            onPress={() => toggleSaved(selectedLocation.id)}
            style={[
              styles.previewButton,
              isSaved(selectedLocation.id) && styles.previewButtonActive,
            ]}>
            <Text style={styles.previewButtonText}>
              {isSaved(selectedLocation.id) ? '★' : '☆'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('LocationDetail', {locationId: selectedLocation.id})
            }
            style={styles.previewButton}>
            <Text style={styles.previewButtonText}>↗</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky,
    flex: 1,
  },
  mapEmoji: {
    fontSize: 24,
  },
  mapHeader: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mapSubtitle: {
    color: colors.inkSoft,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  mapTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
  },
  marker: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  markerActive: {
    backgroundColor: colors.active,
    borderColor: colors.primary,
    transform: [{scale: 1.12}],
  },
  markerText: {
    fontSize: 18,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 96,
    padding: 12,
    position: 'absolute',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 8,
  },
  previewButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  previewButtonActive: {
    backgroundColor: colors.active,
    borderColor: colors.primary,
  },
  previewButtonText: {
    color: colors.primaryDark,
    fontSize: 19,
    fontWeight: '900',
  },
  previewShort: {
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  previewText: {
    flex: 1,
    minWidth: 0,
  },
  previewTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  topOverlay: {
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
