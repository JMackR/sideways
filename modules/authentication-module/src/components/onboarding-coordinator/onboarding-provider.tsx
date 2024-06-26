import React, { PropsWithChildren } from 'react';
import { CoordinatorProvider } from './onboarding-coordinator-provider';
import { WizardNavigationProvider, WizardValidationProvider, WizardStateProvider } from '../wizard-provider';

export const OnboardingCoordinator: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <WizardNavigationProvider>
      <WizardStateProvider>
        <WizardValidationProvider>
          <CoordinatorProvider>{children}</CoordinatorProvider>
        </WizardValidationProvider>
      </WizardStateProvider>
    </WizardNavigationProvider>
  );
};
