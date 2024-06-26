import { Background, Center, Flex, LocalSVGSource, Overlay, SVG, Stack, Text } from '@upward/core-ui-library';
import { TextColors, TextTypes, useColor, useColorForBackgroundColor } from '@upward/themes';
import { TouchableOpacity, View } from 'react-native';
import { NavigationBarItem, NavigationBarProps } from './navigation-bar-props';
import { Avatar, BadgePosition } from '../avatar';
import { MoreIcon } from '@upward/assets';

export const NAVIGATION_BAR_HEIGHT = 100;

enum LAYOUTS {
  NavBarHeight = NAVIGATION_BAR_HEIGHT,
  NonRootNavBarTitleTopSpacing = 4,
  RootNavBarTitleTopSpacing = 4.2,
  NonRootNavBarTitleHorizontal = 12,
  RootNavBarTitleHorizontal = 2.5,
  NavBarBottomSpacing = 3,
  NavigationItemSpacing = 2,
  NavigationItemIconSize = 60,
  NavigationItemTouchTarget = 40,
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  brandLogo,
  title,
  textType = 'bodyRegular1' as keyof TextTypes,
  leftItems,
  rightItems,
  isRootNavBar,
  isMain,
  barItemsTint,
  testID,
  backgroundColor,
}) => {
  const backgroundColorValue = useColorForBackgroundColor(backgroundColor || 'primary');
  const titleTextType = isRootNavBar ? 'bodyRegular1' : textType;
  const titleTextAlignment = isRootNavBar ? 'flex-start' : 'center';
  const titleTopInset = isRootNavBar ? LAYOUTS.RootNavBarTitleTopSpacing : LAYOUTS.NonRootNavBarTitleTopSpacing;
  const marginHorizontalStep = !isRootNavBar ? LAYOUTS.NonRootNavBarTitleHorizontal : LAYOUTS.RootNavBarTitleHorizontal;

  return (
    <Flex
      grow={0}
      shrink={0}
      direction={'row'}
      basis={isMain ? LAYOUTS.NavBarHeight : 50}
      width={'100%'}
      style={{ backgroundColor: backgroundColorValue }}
      testID={`${testID || 'navigation-bar'}.title`}
    >
      {backgroundColor && <Background type={backgroundColor} />}

      <Overlay
        insetTopStep={titleTopInset}
        insetBottomStep={LAYOUTS.NavBarBottomSpacing}
        insetLeftStep={marginHorizontalStep}
        insetRightStep={marginHorizontalStep}
        axisDistribution={titleTextAlignment}
        crossAxisDistribution={'center'}
      >
        {title && (
          <Text
            textType={titleTextType}
            textAlign={'center'}
            testID={`${testID || 'navigation-bar'}.title`}
            color={barItemsTint}
          >
            {title}
          </Text>
        )}
        {brandLogo && (
          <Center>
            <SVG localSVG={{ SVG: (brandLogo as LocalSVGSource).SVG, size: { width: 67, height: 18 }, type: 'svg' }} />
          </Center>
        )}
      </Overlay>
      <NavigationItemStack items={rightItems} direction={'row-reverse'} barItemsTint={barItemsTint} />
      {!isRootNavBar && <NavigationItemStack items={leftItems} direction={'row'} barItemsTint={barItemsTint} isMain={isMain} />}
    </Flex>
  );
};

interface NavigationItemStackProps {
  items: NavigationBarItem[] | undefined;
  direction: 'row' | 'row-reverse';
  barItemsTint?: keyof TextColors;
  isMain?: boolean
}

const NavigationItemStack = (props: NavigationItemStackProps) => {
  const { items, direction, barItemsTint, isMain } = props;
  if (!items || items.length === 0) {
    return null;
  }

  const leftStep = direction === 'row-reverse' ? undefined : LAYOUTS.RootNavBarTitleHorizontal;
  const rightStep = direction === 'row' ? undefined : LAYOUTS.RootNavBarTitleHorizontal;
  return (
    <Overlay
      insetTopStep={LAYOUTS.RootNavBarTitleTopSpacing}
      insetBottomStep={LAYOUTS.NavBarBottomSpacing}
      insetLeftStep={leftStep}
      insetRightStep={rightStep}
      direction={direction}
      crossAxisDistribution={'center'}
      grow={0}
      shrink={1}
      testID={`navigation-bar.${direction === 'row' ? 'left-items' : 'right-items'}`}
    >
      <Stack direction={'row'} axisDistribution={'center'} childSeparationStep={LAYOUTS.NavigationItemSpacing}>
        {items.map((item: NavigationBarItem, index: number) => (
          <NavigationItem item={item} index={index} key={index} direction={direction} barItemsTint={barItemsTint} isMain={isMain} />
        ))}
      </Stack>
    </Overlay>
  );
};

interface NavigationItemProps {
  item: NavigationBarItem;
  index: number;
  direction: 'row' | 'row-reverse';
  barItemsTint?: keyof TextColors;
  rotateIcon?: string;
  isMain?: boolean
}

const NavigationItem = (props: NavigationItemProps) => {
  const { item, index, direction, barItemsTint, isMain } = props;
  const { avatar, name, imageUrl, title, icon, tint, pressHandler, testID, textType } = item;
  const { colors } = useColor();
  const resizedSVG = resizeSVGForNavigationBarItem(icon, isMain);
  const colorTint = tint || barItemsTint;

  return (
    <TouchableOpacity
      onPress={pressHandler}
      testID={testID || `navigation-bar-item.${index}`}
      style={{
        minWidth: LAYOUTS.NavigationItemTouchTarget,
        height: LAYOUTS.NavigationItemTouchTarget,
        flexDirection: icon && title ? 'column' : direction,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex crossAxisDistribution={'center'}>{!!resizedSVG && <SVG localSVG={resizedSVG} tint={colorTint} />}</Flex>
      <Flex crossAxisDistribution={'center'}>
        {!!title && (
          <Text textType={textType || 'bodyMedium1'} color={colorTint}>
            {title}
          </Text>
        )}
      </Flex>

      <Flex crossAxisDistribution={'center'}>
        {avatar && (
          <Avatar
            name={name}
            imageSize={'small'}
            containerStyle={{ backgroundColor: colors.brand }}
            source={imageUrl}
            badgeProps={{
              icon: MoreIcon,
              onPress: pressHandler,
              iconTint: 'brand',
              borderWidth: 1,
              borderColor: "blue",
              backgroundColor: "#fff",
              size: 25,
            }}
            badgePosition={BadgePosition.BOTTOM_RIGHT}

          />
        )}
      </Flex>
    </TouchableOpacity>
  );
};

const resizeSVGForNavigationBarItem = (svgSource: LocalSVGSource | undefined, isMain?: boolean) => {
  const size = isMain ? LAYOUTS.NavigationItemIconSize : 20
  if (svgSource) {
    return {
      SVG: svgSource.SVG,
      size: {
        width: svgSource?.size?.width || size,
        height: svgSource?.size?.height || size,
      },
    };
  }
  return undefined;
};
