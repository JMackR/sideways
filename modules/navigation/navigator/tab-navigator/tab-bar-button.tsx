import { Badge, Text } from '@upward/core-ui-library';
import { useColorForBackgroundColor } from '@upward/themes';
import { isTablet, ms } from '@upward/utilities';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: isTablet ? 0.7 : 1 }],
    position: 'relative',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: isTablet ? -ms(15) : 0,
    left: '55%',
  },
});

interface TabBarButtonProps {
  onPress: () => void;
  renderIcon: React.ReactNode;
  active: boolean;
  labelText: string;
  badgeAmount?: number;
  index: number;
  testID?: string;
}

const animate1 = {
  0: { scale: 1 },
  0.3: { scale: 1.1 },
  0.5: { scale: 0.75 },
  0.8: { scale: 1.1 },
  1: { scale: 1 },
};
const animate2 = { 0: { scale: 1 }, 1: { scale: 1 } };

const TabBarButton = (props: TabBarButtonProps) => {
  const { onPress, renderIcon, badgeAmount, labelText, index, active, testID } = props;
  const textColorKey = props.active ? 'brand' : 'secondary';
  const { t } = useTranslation();
  const viewRef = useRef<any>(null);
  const styles = useStyles();

  useEffect(() => {
    if (active && viewRef.current) {
      viewRef.current.animate(animate1);
    } else if (viewRef.current) {
      viewRef.current.animate(animate2);
    }
  }, [active]);

  return (
    <TouchableOpacity
      style={[Styles.tabButton]}
      onPress={onPress}
      testID={testID || `tab-navigator.tab-bar-button.${index}`}
    >
      <Animatable.View ref={viewRef} duration={1200} style={active ? styles.circle : styles.unfocusedCircle}>
        {renderIcon}
      </Animatable.View>

      {badgeAmount !== undefined && badgeAmount > 0 && (
        <View style={Styles.badge}>
          <Badge amount={badgeAmount} testID={'tab-navigator.tab-bar-button.badge'} showBorder />
        </View>
      )}
      <Text
        textType={active ? 'bodyMedium2' : 'bodyMedium2'}
        color={textColorKey}
        testID={'tab-navigator.tab-bar-button.label'}
        numberOfLines={1}
      >
        {t(labelText)}
      </Text>
    </TouchableOpacity>
  );
};

export { TabBarButton };

const useStyles = () =>
  StyleSheet.create({
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: useColorForBackgroundColor('primary'),
      borderRadius: 50,
      width: ms(33),
      height: ms(33),
    },
    unfocusedCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      width: ms(33),
      height: ms(33),
    },
  });
