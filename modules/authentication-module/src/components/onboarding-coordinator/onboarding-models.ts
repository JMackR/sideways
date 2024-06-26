import { NavigableRoute } from '@upward/navigation';
import { OnboardingWizard } from '../onboarding-wizard';
import { OnboardingStep } from './constants';

export interface OnboardingViewModel {
  wizardStep: number;
  screenName: keyof typeof NavigableRoute;
  nextScreen?: keyof typeof NavigableRoute;
  backStep: boolean;
  navGestureEnabled?: boolean;
  validationKeys?: any;
  components: Component[];
  screenComponent: () => JSX.Element;
  footerVisible: boolean;
}
type Component = {
  component: string;
};

export const getViewModels = () => {
  const viewModels: OnboardingViewModel[] = [
    {
      wizardStep: OnboardingStep.STEP_0,
      screenName: NavigableRoute.EMAIL_SIGNIN,
      nextScreen: NavigableRoute.EMAIL_VERIFICATION,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: false,
      components: [{ component: 'email_signin' }],
    },
    {
      wizardStep: OnboardingStep.STEP_1,
      screenName: NavigableRoute.EMAIL_VERIFICATION,
      nextScreen: NavigableRoute.STEP_2,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: false,
      components: [
        {
          component: 'email_verification',
        },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_2,
      screenName: NavigableRoute.STEP_2,
      nextScreen: NavigableRoute.STEP_3,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'single_select',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_3,
      screenName: NavigableRoute.STEP_3,
      nextScreen: NavigableRoute.STEP_4,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'carousel',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_4,
      screenName: NavigableRoute.STEP_4,
      nextScreen: NavigableRoute.STEP_5,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'startdate_select',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_5,
      screenName: NavigableRoute.STEP_5,
      nextScreen: NavigableRoute.STEP_6,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'single_select',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_6,
      screenName: NavigableRoute.STEP_6,
      nextScreen: NavigableRoute.STEP_7,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'single_select',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_7,
      screenName: NavigableRoute.STEP_7,
      nextScreen: NavigableRoute.STEP_8,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'social_select',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
    {
      wizardStep: OnboardingStep.STEP_8,
      screenName: NavigableRoute.STEP_8,
      nextScreen: NavigableRoute.HOME_STACK,
      backStep: true,
      navGestureEnabled: false,
      validationKeys: [],
      screenComponent: OnboardingWizard,
      footerVisible: true,
      components: [
        {
          component: 'header',
        },
        {
          component: 'finish',
        },
        // {
        //   component: 'footer',
        // },
      ],
    },
  ];
  return viewModels;
};
