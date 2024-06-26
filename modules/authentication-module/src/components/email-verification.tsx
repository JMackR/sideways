import { Button, Margin, Stack, Text } from '@upward/core-ui-library';
import { useTranslation } from 'react-i18next';
import { useCoordinator } from './onboarding-coordinator';

export const EmailVerification = () => {
  const { t } = useTranslation();
  const { handleFooterButtonClicked, toPrevStep } = useCoordinator();

  return (
    <Margin grow={1} direction="column" marginLeftStep={2} marginRightStep={2}>
      <Stack direction="column" childSeparationStep={3}>
        <Margin>
          <Text textType="headerBold1" color={'primary'}>
            {t('onboard.EMAIL_VERIFICATION_TEXT')}
          </Text>
        </Margin>
        <Margin>
          <Text textType="bodyRegular2" color={'primary'}>
            {t('onboard.VERIFY_ACCOUNT')}
          </Text>
        </Margin>
        <Margin>
          <Text textType="bodyRegular2" color={'primary'}>
            {t('onboard.NO_EMAIL')}
          </Text>
        </Margin>
        <Margin axisDistribution="flex-start">
          <Button
            title={t('onboard.RESEND_EMAIL')}
            buttonType="text"
            buttonSize="medium"
            weight="bodyBold2"
            titleColor="primary"
            doNotApplySidePadding
            onClick={() => handleFooterButtonClicked()}
          />
        </Margin>
      </Stack>
    </Margin>
  );
};
