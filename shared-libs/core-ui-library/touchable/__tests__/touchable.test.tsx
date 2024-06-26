import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Touchable } from '../touchable';

describe('Touchable Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Touchable children={''} />);
    const touchableView = getByTestId('touchable');
    expect(touchableView).toBeDefined();
  });

  it('renders correctly with custom props', () => {
    const onPressMock = jest.fn();
    const style = { backgroundColor: 'red' };
    const testID = 'test-touchable';
    const disabled = false;

    const { getByTestId } = render(
      <Touchable onPress={onPressMock} style={style} testID={testID} disabled={disabled}></Touchable>,
    );
    const touchableView = getByTestId(testID);
    expect(touchableView).toBeDefined();
    fireEvent.press(touchableView);
    expect(onPressMock).toHaveBeenCalled();
  });
});
