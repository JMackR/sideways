import { render, fireEvent } from '@testing-library/react-native';
import { ValidatedInput } from '../validated-input'; // Import your component here

describe('ValidatedInput', () => {
  test('renders input with correct initial value', () => {
    const defaultValue = 'initial value';

    const { getByDisplayValue } = render(<ValidatedInput text={defaultValue} validators={[]} />);
    const inputElement = getByDisplayValue(defaultValue);

    expect(inputElement).toBeDefined();
  });

  test('calls textChangeHandler when input value changes', () => {
    const isValidWithValue = jest.fn();

    const onChange = jest.fn();
    const { getByTestId } = render(
      <ValidatedInput
        textChangeHandler={onChange}
        validators={[]}
        text={'old value'}
        tintColor={isValidWithValue() && 'onBackground'}
      />,
    );
    const inputElement = getByTestId('ucl.input.text-entry');

    fireEvent.changeText(inputElement, 'new value');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new value');
    expect(isValidWithValue).toHaveBeenCalled();
  });
});
