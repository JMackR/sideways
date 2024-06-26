import { View, FlatList } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import { useColor, useTheme } from '@upward/themes';
import { Margin } from '@upward/core-ui-library';

export const SkeletonLoader = (props: any) => {
  const { componentStyle, skeletonData, columns } = props;
  const colorScheme = useTheme();
  const { colors } = useColor();
  const boneColor = colorScheme.colorThemeId === 'dark_mode' ? colors.altBackground : colors.faceIDLightBackground;
  const highlightColor = colorScheme.colorThemeId === 'dark_mode' ? colors.darkBackground : colors.lightBackground;

  const renderCard = ({ item, index }: { item: any; index: number }) => {
    return (
      <Margin key={index} {...item.contentContainerStyle}>
        <Skeleton
          isLoading
          boneColor={boneColor}
          highlightColor={highlightColor}
          animationDirection="horizontalRight"
          layout={item.layout}
        />
      </Margin>
    );
  };

  return (
    <View style={componentStyle?.topNavigationSkeletonContainer}>
      <FlatList testID="skeletonLoaderContainer" data={skeletonData} numColumns={columns} renderItem={renderCard} />
    </View>
  );
};
