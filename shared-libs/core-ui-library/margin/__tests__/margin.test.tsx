import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Margin } from '../margin';
import { MarginProps } from '../margin-props';
import { Text } from '../..';

const renderComponent = (props: MarginProps) => {
  return render(<Margin {...props} />);
};

const defaultProps: MarginProps = {
  testID: 'margin',
  marginStep: 2,
  marginLeftStep: 1,
  marginRightStep: 3,
  marginTopStep: 0.5,
  marginBottomStep: 1,
  children: <Text testID="child">Child</Text>,
};

describe('Margin', () => {
  it('renders children with default margin', () => {
    const { getByTestId } = renderComponent({ ...defaultProps });

    const margin = getByTestId('margin');
    const child = getByTestId('child');
    expect(margin).toBeDefined();
    expect(margin.props.style.margin).toBe(12);
    expect(child).toBeDefined();
  });

  it('applies custom margin styles', () => {
    const { getByTestId } = renderComponent({ ...defaultProps });
    const margin = getByTestId('margin');
    expect(margin).toBeDefined();
    expect(margin.props.style.margin).toBe(12);
    expect(margin.props.style.marginLeft).toBe(6);
    expect(margin.props.style.marginRight).toBe(18);
    expect(margin.props.style.marginTop).toBe(3);
    expect(margin.props.style.marginBottom).toBe(6);
  });

  // Add more tests as needed
});
