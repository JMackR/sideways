import { ComputePropsForTextEntryProps } from '../text-entry-shared';

jest.mock('@upward/themes', () => ({
  useColorsForTextColorsCollection: jest.fn(() => ['primaryColor', 'hintColor', 'tintColor']),
  useFontForTextType: jest.fn(() => ({ fontSize: 16, lineHeight: 1.5 })),
}));

describe('ComputePropsForTextEntryProps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('correctly computes properties with default values', () => {
    const props = {};
    const result = ComputePropsForTextEntryProps(props);

    const expectedFontSize = 2;
    const expectedLineHeight = 1.5;
    const expectedMinPointHeight = expectedFontSize * expectedLineHeight;
    const expectedMaxPointHeight = expectedFontSize * expectedLineHeight;

    expect(result).toEqual({
      autoCapitalize: 'none',
      autoCorrect: true,
      autoCompleteType: 'off',
      font: { fontSize: 16, lineHeight: 1.5 },
      minLineHeight: 1,
      maxLineHeight: 1,
      minPointHeight: expectedMinPointHeight,
      maxPointHeight: expectedMaxPointHeight,
      isMultiline: false,
      primaryColor: 'primaryColor',
      hintColor: 'hintColor',
      tintColor: 'tintColor',
    });
  });

  it('correctly handles different text types', () => {
    const props = { textType: 'header1' };
    const result = ComputePropsForTextEntryProps(props);

    expect(result.font).toEqual(
      expect.objectContaining({ fontSize: expect.any(Number), lineHeight: expect.any(Number) }),
    );
  });

  it('correctly handles different line minimum and maximum values', () => {
    const props = { linesMinimum: 2, linesMaximum: 5 };
    const result = ComputePropsForTextEntryProps(props);

    expect(result.minLineHeight).toBe(2);
    expect(result.maxLineHeight).toBe(5);
  });

  it('correctly handles different text and hint colors', () => {
    const props = { textColor: 'red', hintColor: 'blue', tintColor: 'green' };
    const result = ComputePropsForTextEntryProps(props);

    expect(result.primaryColor).toBe('primaryColor');
    expect(result.hintColor).toBe('hintColor');
    expect(result.tintColor).toBe('tintColor');
  });
  it('correctly computes properties with default values', () => {
    const props = {
      textColor: 'primaryColor',
      hintColor: 'hintColor',
      tintColor: 'tintColor',
      autoCapitalize: 'none',
      autoCorrect: true,
      autoCompleteType: 'off',
    };
    const computedProps = ComputePropsForTextEntryProps(props);
    expect(computedProps.autoCapitalize).toEqual('none');
    expect(computedProps.autoCorrect).toEqual(true);
    expect(computedProps.autoCompleteType).toEqual('off');
  });
});
