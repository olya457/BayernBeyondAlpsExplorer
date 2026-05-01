import type {ImageSourcePropType} from 'react-native';

export type LocationCategory =
  | 'Alpine Views'
  | 'Historic Layers'
  | 'Industrial Roots'
  | 'Quiet Corners';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  id: string;
  title: string;
  category: LocationCategory;
  emoji: string;
  short: string;
  long: string;
  coordinates: Coordinates;
  image: ImageSourcePropType;
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  emoji: string;
  image: ImageSourcePropType;
};
