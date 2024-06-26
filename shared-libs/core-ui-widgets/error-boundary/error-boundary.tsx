import React, { type ComponentType, type ReactNode } from 'react';

import {
  GenericErrorFallback,
  type ErrorProps as FallbackComponentProps,
} from '../error-fallback/generic-error-fallback';

export type Props = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  FallbackComponent: ComponentType<FallbackComponentProps>;
  onError?: (error: Error, stackTrace: string) => void;
  postLogs?: (props: any) => void;
};

type State = { error: Error | null };

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    // const [postLogs] = useErrorLoggingMutation();

    return (
      <Component
        // postLogs={postLogs}
        {...props}
      />
    );
  };
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static defaultProps: {
    FallbackComponent: ComponentType<FallbackComponentProps>;
  } = {
    FallbackComponent: GenericErrorFallback,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  async componentDidCatch(error: Error, info: { componentStack: string }) {
    // const token = await AsyncStorage.getItem(ANTIFORGERY_TOKEN);
    if (typeof this.props.onError === 'function') {
      // const MOBILE_LOG_GROUP_LV = 2;
      // const ERROR_LOG_LEVEL = 5;
      // const data = JSON.stringify(info.componentStack, null, 2);
      // const obj = {
      //   ApplicationLogLevelLV: ERROR_LOG_LEVEL,
      //   ApplicationLogGroupLV: MOBILE_LOG_GROUP_LV,
      //   ApplicationLogSubGroupLV: 'bob',
      //   ApplicationLogText1: error,
      //   Data: `@stacktrace: ${data}`,
      // };

      // this.props.postLogs({ obj: obj, token: token });
      this.props.onError(error, info.componentStack);
    }
  }

  resetError: () => void = () => {
    this.setState({ error: null });
  };

  render() {
    const { FallbackComponent } = this.props;

    return this.state.error ? (
      <FallbackComponent error={this.state.error} resetError={this.resetError} />
    ) : (
      this.props.children
    );
  }
}

export default withHooksHOC(ErrorBoundary);
