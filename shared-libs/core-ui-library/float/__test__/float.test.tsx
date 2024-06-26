import { render } from '@testing-library/react-native';
import { Float } from '../float';
import { View } from 'react-native';

describe('Float', () => {
  it('renders children and applies styles correctly', () => {
    const { getByTestId } = render(
      <Float
        insetLeftStep={10}
        insetBottomStep={20}
        width={100}
        height={100}
        axisDistribution="center"
        crossAxisDistribution="center"
        basis="auto"
        grow={1}
        shrink={1}
        direction="row"
        testID="float-test"
      >
        <View testID="child-component" />
      </Float>,
    );

    // Check if the child component is rendered
    expect(getByTestId('child-component')).toBeDefined();

    // Check if the styles are applied correctly
    const floatElement = getByTestId('float-test');
    expect(floatElement.props.style).toEqual({
      position: 'absolute',
      bottom: 120,
      left: 60,
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: undefined,
      height: 100,
      width: 100,
    });
  });
});
