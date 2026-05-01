import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets/images';
import type {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {androidEdgeInset} from '../theme/layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    image: images.onboarding[0],
    title: 'Bavaria Without Rush',
    subtitle: 'Castles, lakes, towns and quiet routes across the region.',
  },
  {
    image: images.onboarding[1],
    title: 'Alpine Views',
    subtitle: 'Mountain water, narrow gorges and viewpoints worth a slow morning.',
  },
  {
    image: images.onboarding[2],
    title: 'Historic Layers',
    subtitle: 'Medieval streets, river towns and ridge castles with room to wander.',
  },
  {
    image: images.onboarding[3],
    title: 'Industrial Roots',
    subtitle: 'Design, engineering and museums that show modern Bavaria.',
  },
  {
    image: images.onboarding[4],
    title: 'Quiet Corners',
    subtitle: 'Save places, return after restart, and keep them until you delete them.',
  },
];

export function OnboardingScreen({navigation}: Props) {
  const listRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const [index, setIndex] = useState(0);
  const {width} = useWindowDimensions();
  const safeInsets = useSafeAreaInsets();
  const top = Platform.OS === 'android' ? Math.max(safeInsets.top, androidEdgeInset) : safeInsets.top;
  const bottom =
    Platform.OS === 'android' ? androidEdgeInset : Math.max(safeInsets.bottom, 20);

  const finish = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs'}],
    });
  };

  const next = () => {
    if (index === slides.length - 1) {
      finish();
      return;
    }

    listRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    if (nextIndex !== index) {
      setIndex(nextIndex);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        data={slides}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <ImageBackground
            source={item.image}
            resizeMode="cover"
            style={[styles.slide, {width}]}>
            <View style={styles.scrim} />
            <View style={[styles.copy, {paddingTop: top, paddingBottom: bottom + 98}]}>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.78}
                style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={3} style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>
          </ImageBackground>
        )}
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={[styles.footer, {bottom: bottom + 18}]}>
        <View style={styles.dots}>
          {slides.map((slide, dotIndex) => (
            <View
              key={slide.title}
              style={[styles.dot, dotIndex === index && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <Pressable onPress={finish} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Skip</Text>
          </Pressable>
          <Pressable onPress={next} style={styles.primaryButton}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.84}
              style={styles.primaryText}>
              {index === slides.length - 1 ? 'Start' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  copy: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.46)',
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: colors.surface,
    width: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 18,
  },
  footer: {
    left: 20,
    position: 'absolute',
    right: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  screen: {
    backgroundColor: colors.primaryDark,
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,26,24,0.36)',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.44)',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 92,
  },
  secondaryText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  slide: {
    flex: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    maxWidth: 330,
  },
  title: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 40,
    maxWidth: 340,
  },
});
