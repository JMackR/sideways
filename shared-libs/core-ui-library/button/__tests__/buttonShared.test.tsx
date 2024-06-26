import { screen } from '@testing-library/react-native';
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from '../button-shared';

describe('textColorForCurrentButtonType utility function', () => {
  it('returns the correct text color for the primary button type', () => {
    const result = textColorForCurrentButtonType('primary');
    expect(result).toBe('brandAlt');
  });

  it('returns the correct text color for the inverse button type', () => {
    const result = textColorForCurrentButtonType('inverse');
    expect(result).toBe('onInverseOutline');
  });

  it('returns the correct text color for the text button type', () => {
    const result = textColorForCurrentButtonType('text');
    expect(result).toBe('onTransparent');
  });

  it('returns the correct text color for the disabled button type', () => {
    const result = textColorForCurrentButtonType('disabled');
    expect(result).toBe('onDisabled');
  });

  it('returns the correct text color for the floating-button button type', () => {
    const result = textColorForCurrentButtonType('floating-button');
    expect(result).toBe('alwaysLight');
  });
});

describe('isJSXElement utility function', () => {
  it('returns true when the input is a JSX element', () => {
    const jsxElement = <div>Test JSX Element</div>;
    const result = isJSXElement(jsxElement);
    expect(result).toBe(true);
  });

  it('returns false when the input is not a JSX element', () => {
    const notJsxElement = 'Not a JSX element';
    const result = isJSXElement(notJsxElement);
    expect(result).toBe(false);
  });
});

describe('isLocalSVGSource utility function', () => {
  it('returns true when the input is a LocalSVGSource', () => {
    const localSVGSource = { SVG: '<svg></svg>' };
    const result = isLocalSVGSource(localSVGSource);
    expect(result).toBe(true);
  });

  it('returns false when the input is not a LocalSVGSource', () => {
    const notLocalSVGSource = { notSVG: '<svg></svg>' };
    const result = isLocalSVGSource(notLocalSVGSource);
    expect(result).toBe(false);
  });
});
