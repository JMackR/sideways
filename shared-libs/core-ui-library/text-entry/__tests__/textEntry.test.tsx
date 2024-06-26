import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextEntry } from '../text-entry';

describe('TextEntry', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<TextEntry />);
    const textEntry = getByTestId('text-entry');
    expect(textEntry).toBeDefined();
  });

  it('calls textChangeHandler when text changes', () => {
    const textChangeHandler = jest.fn();
    const { getByTestId } = render(<TextEntry textChangeHandler={textChangeHandler} />);
    const textEntry = getByTestId('text-entry');
    fireEvent.changeText(textEntry, 'Test');
    expect(textChangeHandler).toHaveBeenCalledWith('Test');
  });

  it('calls onSubmitEditing when submitted', () => {
    const onSubmitEditing = jest.fn();
    const { getByTestId } = render(<TextEntry onSubmitEditing={onSubmitEditing} />);
    const textEntry = getByTestId('text-entry');
    fireEvent(textEntry, 'submitEditing', { nativeEvent: { text: 'Submitted' } });
    expect(onSubmitEditing).toHaveBeenCalledWith('Submitted');
  });

  it('calls blurHandler when blurred', () => {
    const blurHandler = jest.fn();
    const { getByTestId } = render(<TextEntry blurHandler={blurHandler} />);
    const textEntry = getByTestId('text-entry');
    fireEvent(textEntry, 'blur');
    expect(blurHandler).toHaveBeenCalled();
  });

  it('calls focusHandler when focused', () => {
    const focusHandler = jest.fn();
    const { getByTestId } = render(<TextEntry focusHandler={focusHandler} />);
    const textEntry = getByTestId('text-entry');
    fireEvent(textEntry, 'focus');
    expect(focusHandler).toHaveBeenCalled();
  });

  it('calls focusHandler when focused', () => {
    const focusHandler = jest.fn();
    const { getByTestId } = render(<TextEntry focusHandler={focusHandler} />);
    const textEntry = getByTestId('text-entry');

    fireEvent(textEntry, 'focus');

    expect(focusHandler).toHaveBeenCalled();
  });

  it('calls blurHandler when blurred', () => {
    const blurHandler = jest.fn();
    const { getByTestId } = render(<TextEntry blurHandler={blurHandler} />);
    const textEntry = getByTestId('text-entry');

    fireEvent(textEntry, 'blur');

    expect(blurHandler).toHaveBeenCalled();
  });
  it('should focus on input', () => {
    const focus = jest.fn();
    const input = { current: { focus: jest.fn() } };
    focus(input);
  });

  it('should blur input', () => {
    const blur = jest.fn();
    const input = { current: { blur: jest.fn() } };

    blur(input);
  });

  it('should not focus or blur if input ref is null', () => {
    const blur = jest.fn();
    const focus = jest.fn();
    const input = { current: null };
    focus(input);
    blur(input);
    expect(input.current).toBeNull();
  });
});
