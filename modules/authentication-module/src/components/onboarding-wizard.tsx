import { Flex, Margin } from '@upward/core-ui-library';
import { Screen } from '@upward/core-ui-widgets';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import { EmailSignin } from './email-signin';
import { EmailVerification } from './email-verification';
import { useCoordinator } from './onboarding-coordinator';
import {
  Finish,
  Header,
  PlanCarousel,
  SingleSelect,
  SkipButton,
  SocialSelect,
  StartDateSelect,
  Warning,
} from './interview-components';

interface ComponentsType {
  email_signin: (props: any) => JSX.Element;
  email_verification: (props: any) => JSX.Element;
  // footer: (props: any) => JSX.Element;
  finish: (props: any) => JSX.Element;
  header: (props: any) => JSX.Element;
  carousel: (props: any) => JSX.Element;
  single_select: (props: any) => JSX.Element;
  skip_button: (props: any) => JSX.Element;
  social_select: (props: any) => JSX.Element;
  startdate_select: (props: any) => JSX.Element;
  warning: (props: any) => JSX.Element;
}

const Components: ComponentsType = {
  email_signin: EmailSignin,
  email_verification: EmailVerification,
  // footer: Footer,
  finish: Finish,
  header: Header,
  carousel: PlanCarousel,
  single_select: SingleSelect,
  skip_button: SkipButton,
  social_select: SocialSelect,
  startdate_select: StartDateSelect,
  warning: Warning,
};

const SCREEN_MARGINS = {
  marginLeftStep: 4,
  marginRightStep: 4,
};

export const OnboardingWizard = () => {
  const { viewModel } = useCoordinator();
  const listRef = useRef(null);

  const renderComponents =
    (Components: any) =>
    ({ item, index }: { item: any; index: number }) => {
      const Section = Components[item['component']];
      return (
        <Flex key={`${index}-${item.component}`}>
          <Section {...viewModel} />
        </Flex>
      );
    };

  return (
    <Screen safeAreaMode={'none'} screenName={viewModel?.screenName}>
      <Margin {...SCREEN_MARGINS} grow={1}>
        <FlatList
          ref={listRef}
          data={viewModel?.components}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.component}+${index}`}
          renderItem={renderComponents(Components)}
        />
      </Margin>
    </Screen>
  );
};
