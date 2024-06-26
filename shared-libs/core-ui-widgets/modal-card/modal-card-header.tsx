import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon, XmarkIcon } from '@upward/assets';
import { BottomSheetHandle, BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { useColor, useColorForBackgroundColor } from '@upward/themes';
import { NAVIGATION_BAR_HEIGHT, NavigationBar, BackButton } from '..';
import type { ModalCardProps } from './modal-card.props';
import { useSafeArea } from 'react-native-safe-area-context';

interface HeaderHandleProps extends BottomSheetHandleProps {
  children?: string | React.ReactNode | React.ReactNode[];
}

const CARD_CORNER_RADIUS = 8;
const ModalHeaderComponent = (props: ModalCardProps) => {
  const { leftButtonType, title } = props;

  const {
    disableDefaultNavigationBar,
    disableDownDrag,
    disableModalTopBar,
    headerLogo,
    onLeftButtonClick: onLeftButtonClickProp,
    onRightButtonOnClick,
    onRightButtonClick: onRightButtonClickProp,
    rightButtonText,
    rightIcon,
    testID,
  } = props;

  const useHeaderRadius = props.useHeaderRadius !== undefined ? props.useHeaderRadius : true;
  const { colors } = useColor();
  const insets = useSafeArea();
  const navBarHeight = disableDefaultNavigationBar ? 0 : NAVIGATION_BAR_HEIGHT;
  const cardCornerRadius = useHeaderRadius ? CARD_CORNER_RADIUS : 0;
  const topInset = useHeaderRadius ? 0 : insets.top;
  const headerHeight = navBarHeight + topInset;

  const styles = StyleSheet.create({
    header_container: {
      // paddingTop: topInset,
      width: '100%',
      // marginBottom: -1,
      backgroundColor: useColorForBackgroundColor('alwaysDark'),
      borderTopLeftRadius: cardCornerRadius,
      borderTopRightRadius: cardCornerRadius,
      height: headerHeight,
      flexWrap: 'nowrap',
      alignItems: 'center',
      overflow: 'hidden',
    },
  });

  const getBackSvg = () => {
    switch (leftButtonType) {
      case 'arrow':
        return ChevronRightIcon;
      case 'close':
        return ChevronLeftIcon;
      case 'back':
        return BackButton;
      case 'down':
        return XmarkIcon;
      default:
        return undefined;
    }
  };

  const onLeftButtonClick = () => {
    onLeftButtonClickProp && onLeftButtonClickProp();
  };

  const leftButton: NavigationBarItem = {
    icon: getBackSvg(),
    tint: 'primary4',
    pressHandler: onLeftButtonClick,
    testID: (testID || 'modal-card') + '.back',
  };

  const rightButton: NavigationBarItem = {
    icon: rightIcon || undefined,
    tint: 'primary1',
    pressHandler: () => {
      if (onRightButtonClickProp) {
        onRightButtonClickProp();
      } else {
        onLeftButtonClick();
      }
    },
    title: rightButtonText && rightButtonText,
    testID: (testID || 'modal-card') + '.' + (rightButtonText || 'right-button').toLowerCase(),
  };

  return (
    <>
      <View style={styles.header_container}>
        {/* <Overlay insetTopStep={2}>{!disableDownDrag && <SVG localSVG={{ ...DownDragIcon }} />}</Overlay> */}
        {!disableDefaultNavigationBar && (
          <NavigationBar
            title={title}
            testID={testID}
            leftItems={[leftButton]}
            rightItems={[rightButton]}
            brandLogo={headerLogo}
            textType={'primary'}
            barItemsTint={'primary'}
          />
        )}
      </View>
    </>
  );
};
const HeaderHandleComponent = (props: any) => {
  const { disableModalTopBar } = props;
  const indicatorStyle = disableModalTopBar ? styles.no_indicator : styles.indicator;
  return (
    <BottomSheetHandle style={styles.container} indicatorStyle={indicatorStyle} {...props}>
      <ModalHeaderComponent {...props} />
    </BottomSheetHandle>
  );
};
const styles = StyleSheet.create({
  container: {
    zIndex: 99999,
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
  no_indicator: {
    height: 0,
    opacity: 0,
  },
});
export const HeaderHandle = memo(HeaderHandleComponent);
