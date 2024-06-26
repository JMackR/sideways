import React from 'react';
import { getViewModels, OnboardingViewModel } from '../onboarding-coordinator';
import { useSelector } from 'react-redux';
import { RootState } from '@upward/store';
import { useNavigationState } from '@react-navigation/native';

const STARTING_SCREEN_INDEX = 0;

interface NavigationContextProps {
  screenIndex: number;
  setScreenIndex: (screenIndex: number) => void;
  viewModels: OnboardingViewModel[];
}

const NavigationContext = React.createContext({
  screenIndex: STARTING_SCREEN_INDEX,
  setScreenIndex: (screenIndex: number) => {
    screenIndex;
  },
  viewModels: [],
} as NavigationContextProps);

export const useOnboardingNavigation = () => {
  return React.useContext(NavigationContext);
};
interface NavigationProvideProps {
  children: React.ReactNode;
}
export const WizardNavigationProvider = ({ children }: NavigationProvideProps) => {
  const [screenIndex, setScreenIndex] = React.useState(STARTING_SCREEN_INDEX);
  const wizardSteps = useSelector((state: RootState) => state.auth?.wizardSteps);
  const state = useNavigationState((state) => state);

  const stepModels = getViewModels();

  const viewModels = stepModels.reduce((accum: any, curr: any) => {
    const index = wizardSteps.findIndex(({ wizardStep }: any) => wizardStep === curr.wizardStep);
    if (index > -1) {
      const combineModels = { ...curr, ...wizardSteps[index] };
      accum = [...accum, combineModels];
    } else {
      accum;
    }
    return accum;
  }, []);

  return (
    <NavigationContext.Provider value={{ screenIndex, setScreenIndex, viewModels }}>
      {children}
    </NavigationContext.Provider>
  );
};
