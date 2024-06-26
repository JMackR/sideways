import React, { useContext, PropsWithChildren } from 'react';
import { WizardContext } from './wizard-state-provider';
import { useOnboardingNavigation } from './wizard-navigation-provider';
import { getOnboardingValidators } from '../onboarding-coordinator';

export interface InputValidationResult {
  toggle?: string | undefined;
  input?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  year?: string | undefined;
  make?: string | undefined;
  model?: string | undefined;
  number?: string | undefined;
  pill?: string | undefined;
  multiFirstLastName?: string | undefined;
  multiVehicles?: string | undefined;
}

export type OnboardingValidationKey = keyof InputValidationResult;

interface InputValidationContextProps {
  validationResult: InputValidationResult;
  setValidationResult: (validationResult: InputValidationResult) => void;
}

export const InputValidationContext = React.createContext<InputValidationContextProps>({
  validationResult: {},
  setValidationResult: (_vr) => {},
});

export const WizardValidationProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [validationResult, setValidationResult] = React.useState<InputValidationResult>({});
  return (
    <InputValidationContext.Provider value={{ validationResult, setValidationResult }}>
      {children}
    </InputValidationContext.Provider>
  );
};

export const useInputValidationResult = (key: OnboardingValidationKey) => {
  const { validationResult, setValidationResult } = React.useContext(InputValidationContext);
  return {
    validationErrorText: validationResult[key],
    clearValidationError: () => {
      if (validationResult[key] !== undefined) {
        validationResult[key] = undefined;
        setValidationResult({ ...validationResult });
      }
    },
  };
};

export const useNextButtonValidationForKeys = (validationKeys: OnboardingValidationKey[]) => {
  const { onboarding, updateOnboardingValidation } = useContext(WizardContext);
  const { screenIndex } = useOnboardingNavigation();

  const { validationResult, setValidationResult } = React.useContext(InputValidationContext);
  return {
    runValidators: () => {
      const { validators } = getOnboardingValidators();

      validationKeys.forEach((key) => {
        const validator = validators[key];

        validationResult[key] = validator(onboarding, screenIndex);
      });

      setValidationResult({ ...validationResult });
      const numberOfFailures = validationKeys
        .map((key) => validationResult[key] === undefined)
        .filter((val) => val === false).length;
      const atLeastOneValidatorFailed = numberOfFailures > 0;
      return { atLeastOneValidatorFailed };
    },
  };
};
