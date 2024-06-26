import { render } from '@testing-library/react-native';
import { Stack, StackProps } from '..';
import { Text } from '../..';

const renderComponent = (props: StackProps) => {
  return render(<Stack {...props} />);
};

const defaultProps: StackProps = {
  testID: 'stack',
  direction: 'row',
  children: (
    <>
      <Text testID="child1" />
      <Text testID="child2" />
      <Text testID="child3" />
    </>
  ),
};

describe('Stack', () => {
  it('renders children in a stack layout', () => {
    const { getByTestId } = renderComponent({ ...defaultProps });
    const stack = getByTestId('stack');
    const child1 = getByTestId('child1');
    const child2 = getByTestId('child2');
    const child3 = getByTestId('child3');
    expect(stack).toBeDefined();
    expect(child1).toBeDefined();
    expect(child2).toBeDefined();
    expect(child3).toBeDefined();
    expect(stack.props.style.flexDirection).toBe('row');
  });

  it('applies custom styles and properties', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      direction: 'column',
      axisDistribution: 'center',
      crossAxisDistribution: 'flex-start',
      debugColor: 'red',
    });

    const stack = getByTestId('stack');
    expect(stack.props.style.flexDirection).toBe('column');
    expect(stack.props.style.alignItems).toBe('flex-start');
    expect(stack.props.style.justifyContent).toBe('center');
    expect(stack.props.style.backgroundColor).toBe('red');
  });

  it('applies child separation', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      direction: 'column',
      childSeparationStep: 1,
    });
    const stack = getByTestId('stack');
    const children = stack.children;
    expect(children.length).toBe(3);
  });

  // Add more tests as needed
});
