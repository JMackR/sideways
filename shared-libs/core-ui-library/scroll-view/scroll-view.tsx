import React from 'react';
import { Flex } from '@upward/layout-controls';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ScrollViewProps } from './scroll-view-props';

export const ScrollView: React.FC<ScrollViewProps> = (props) => {
  const { height, disableFlexGrowContentWhenNotScrolling, testID } = props;

  const containerGrow = disableFlexGrowContentWhenNotScrolling ? 0 : 1;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        scrollview: {
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          flexShrink: 0,
          flexGrow: containerGrow,
          flexDirection: 'column',
          overflow: 'auto',
        },
      }),
    [containerGrow],
  );

  return (
    <Flex grow={containerGrow} shrink={0} height={height}>
      <div data-test-id={testID || 'scroll-view'} className={css(styles.scrollview)}>
        {props.children}
      </div>
    </Flex>
  );
};
