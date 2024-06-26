import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../input';
import '@testing-library/jest-dom';

describe('Input component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Input />);
    expect(getByTestId('ucl.input')).toBeDefined();
  });

  it('renders textEntry correctly with default props', () => {
    const { getByTestId } = render(<Input />);
    const textEntry = getByTestId('ucl.input.text-entry');
    expect(textEntry).toBeTruthy();
    fireEvent(textEntry, 'blur');
    fireEvent(textEntry, 'focus');
  });

  it('renders title when title is provided', async () => {
    const title = 'Sample Title';
    const rightHelperText = 'Right helper text';
    const leftHelperText = 'Left helper text';
    const error = 'Error';
    const { getByTestId, getByText } = render(
      <Input title={title} error={error} rightHelperText={rightHelperText} leftHelperText={leftHelperText} />,
    );
    expect(getByTestId('basic-controls.input.title')).toBeTruthy();
    expect(getByTestId('ucl.input.right-helper-text')).toBeTruthy();
    expect(getByTestId('ucl.input.left-helper-text')).toBeTruthy();
    expect(getByTestId('ucl.input.error-text')).toBeTruthy();

    expect(getByText(title)).toBeTruthy();
    expect(getByText(rightHelperText)).toBeTruthy();
    expect(getByText(leftHelperText)).toBeTruthy();
    expect(getByText(error)).toBeTruthy();
  });

  it('does not render title when title is not provided', () => {
    const { queryByTestId } = render(<Input />);
    expect(queryByTestId('basic-controls.input.title')).not.toBeTruthy();
  });
});
