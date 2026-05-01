import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {images} from '../assets/images';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({navigation}: Props) {
  const scale = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0.78)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.05,
            duration: 1250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.94,
            duration: 1250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.82,
            duration: 1250,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    animation.start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000);

    return () => {
      clearTimeout(timer);
      animation.stop();
    };
  }, [navigation, opacity, scale]);

  return (
    <ImageBackground
      source={images.splashBackground}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.center}>
        <Animated.Image
          source={images.logo}
          resizeMode="contain"
          style={[styles.logo, {opacity, transform: [{scale}]}]}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    height: 152,
    width: 152,
  },
});
