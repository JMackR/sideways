import React, { useContext } from 'react';
import { useSelector } from '../../../node_modules/react-redux';
import type { ColorTheme } from '../type-defs';
import { DefaultColorTheme, colorThemes } from './color-theme-constants';
import type { ThemeProviderProps } from './theme-provider.props';
import { useColorThemeLoading } from './use-color-theme-loading';

export const useColorTheme = () => {
  const { currentColorTheme } = useContext(ColorThemeContext);
  return currentColorTheme;
};

export const colorThemeForThemeId = (colorThemeId: string) => {
  let colorTheme = colorThemes[colorThemeId];

  if (!colorTheme) {
    colorTheme = DefaultColorTheme;
  }
  return colorTheme;
};

export interface ColorThemeContextProps {
  currentColorTheme: ColorTheme;
  colorThemeId: string;
  setColorThemeId: (themeId: string) => void;
  isUsingSystemProvidedTheme: boolean;
}

export const ColorThemeContext = React.createContext<ColorThemeContextProps>({
  currentColorTheme: DefaultColorTheme,
  colorThemeId: DefaultColorTheme.identifier,
  setColorThemeId: (themeId: string) => {},
  isUsingSystemProvidedTheme: true,
});

export const ColorThemeContextProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const clientBrandColor = useSelector((state: any) => {
    return state.client?.clientSettings?.mobileAppSetting?.mobilePrimaryColor;
  });
  const { hasLoadedTheme, colorThemeId, setColorThemeId, isUsingSystemProvidedTheme } = useColorThemeLoading();

  if (!hasLoadedTheme) {
    return null;
  }

  const clientColorTheme = {
    ...colorThemeForThemeId(colorThemeId).colors,
    brand: clientBrandColor ? clientBrandColor : '#0047AB',
  };

  const modifiedTheme = {
    ...colorThemeForThemeId(colorThemeId),
    colors: clientColorTheme,
  };

  const providerValue: ColorThemeContextProps = {
    currentColorTheme: modifiedTheme,
    colorThemeId,
    setColorThemeId,
    isUsingSystemProvidedTheme,
  };

  return <ColorThemeContext.Provider value={providerValue}>{children}</ColorThemeContext.Provider>;
};
