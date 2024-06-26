import { act, fireEvent, render } from '@testing-library/react-native';
import { MaskedInput } from '../masked-input';

describe('MaskedInput', () => {
  it('applies mask to input value', () => {
    const { getByTestId } = render(
      <MaskedInput testID={'masked-Input'} validators={[]} mask={'00-00-00-00'} text={'1234567890'} />,
    );

    const inputElement = getByTestId('masked-Input.input.text-entry');
    expect(inputElement.props.value).toBe('12-34-56-78');
  });

  it('calls textChangeHandler on input change', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MaskedInput
        testID={'masked-Input'}
        validators={[]}
        mask={'00-00-00-00'} // example
        text={'1234567890'}
        textChangeHandler={onChange}
      />,
    );

    const inputElement = getByTestId('masked-Input.input.text-entry');
    fireEvent(inputElement, 'textChangeHandler');
    expect(onChange).toHaveBeenCalled();
  });
});
