/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  currentIndex: number;
  lazy: boolean;
  lazyPreloadDistance: number;
  index: number;
  children: (props: { loading: boolean }) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  width: number;
};

type State = {
  loading: boolean;
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default class TabPage extends React.Component<Props, State> {
  private timerHandler: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: Math.abs(props.currentIndex - props.index) > props.lazyPreloadDistance,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.loading && Math.abs(props.currentIndex - props.index) <= props.lazyPreloadDistance) {
      // Always render the route when it becomes focused
      return { loading: false };
    }

    return null;
  }

  componentDidMount() {
    if (this.props.lazy) {
      // If lazy mode is enabled, listen to when we enter screens
    } else if (this.state.loading) {
      // If lazy mode is not enabled, render the scene with a delay if not loaded already
      // This improves the initial startup time as the scene is no longer blocking
      this.timerHandler = setTimeout(() => this.setState({ loading: false }), 0);
    }
  }

  componentWillUnmount() {
    if (this.timerHandler) {
      clearTimeout(this.timerHandler);
      this.timerHandler = undefined;
    }
  }

  render() {
    const { index, width, style, currentIndex } = this.props;
    const { loading } = this.state;

    const focused = currentIndex === index;

    return (
      <Animated.View
        accessibilityElementsHidden={!focused}
        importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
        style={[
          styles.route,
          // If we don't have the layout yet, make the focused screen fill the container
          // This avoids delay before we are able to render pages side by side
          width ? { width } : focused ? StyleSheet.absoluteFill : null,
          style,
        ]}
      >
        {
          // Only render the route only if it's either focused or layout is available
          // When layout is not available, we must not render unfocused routes
          // so that the focused route can fill the screen
          focused || width ? this.props.children({ loading }) : null
        }
      </Animated.View>
    );
  }
}
