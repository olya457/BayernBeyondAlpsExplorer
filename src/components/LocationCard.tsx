import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import {colors} from '../theme/colors';
import type {Location} from '../types/content';

type LocationCardProps = {
  location: Location;
  saved: boolean;
  compact?: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function LocationCard({
  location,
  saved,
  compact,
  onPress,
  onToggleSaved,
}: LocationCardProps) {
  const handleSave = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleSaved();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.imageWrap}>
        <Image
          source={location.image}
          resizeMode="cover"
          style={[styles.image, compact && styles.compactImage]}
        />
        <Pressable
          onPress={handleSave}
          hitSlop={10}
          style={[styles.saveButton, saved && styles.saveButtonActive]}>
          <Text style={styles.saveIcon}>{saved ? '★' : '☆'}</Text>
        </Pressable>
        <View style={styles.categoryBadge}>
          <Text numberOfLines={1} style={styles.categoryText}>
            {location.emoji} {location.category}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>
          {location.title}
        </Text>
        <Text numberOfLines={compact ? 2 : 3} style={styles.short}>
          {location.short}
        </Text>
        <View style={styles.metaRow}>
          <Text numberOfLines={1} style={styles.metaText}>
            {location.coordinates.latitude.toFixed(4)}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text numberOfLines={1} style={styles.metaText}>
            {location.coordinates.longitude.toFixed(4)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: 8,
    padding: 14,
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
    opacity: 0.84,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    borderWidth: 1,
    bottom: 10,
    left: 10,
    maxWidth: '82%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
  },
  categoryText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
  },
  compactImage: {
    height: 118,
  },
  dot: {
    color: colors.screenTextMuted,
    fontSize: 14,
  },
  image: {
    height: 152,
    width: '100%',
  },
  imageWrap: {
    backgroundColor: colors.sky,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  metaText: {
    color: colors.screenTextMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    width: 38,
  },
  saveButtonActive: {
    backgroundColor: colors.active,
    borderColor: colors.primary,
  },
  saveIcon: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: '800',
  },
  short: {
    color: colors.screenTextMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    color: colors.screenText,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 23,
  },
});
