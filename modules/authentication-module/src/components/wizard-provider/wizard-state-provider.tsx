import React, { useState, useContext, PropsWithChildren } from 'react';
import { OnboardingData, DEFAULT_PROPS } from './onboarding-types';
import { cloneDeep } from 'lodash';
import _ from 'lodash';
export const buildDefaultOnboarding = (): OnboardingData => {
  return { ...cloneDeep(DEFAULT_PROPS) };
};
interface OnboardingContext {
  onboarding: OnboardingData;
  updateOnboardingValidation: (partial: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;
}

export const WizardContext = React.createContext<OnboardingContext>({
  onboarding: buildDefaultOnboarding(),
  updateOnboardingValidation: (_partial: Partial<OnboardingData>) => {},
  resetOnboarding: () => {},
});

export const useOnboarding = () => {
  return useContext(WizardContext);
};

export const WizardStateProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [onboarding, setOnboarding] = useState<any>(buildDefaultOnboarding());

  const updateOnboardingValidation = (partialOnboarding: Partial<OnboardingData>) => {
    setOnboarding((onboarding: any) => {
      return { ...onboarding, ...partialOnboarding };
    });
  };
  const resetOnboarding = () => null;

  return (
    <WizardContext.Provider
      value={{
        onboarding,
        updateOnboardingValidation,
        resetOnboarding,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
