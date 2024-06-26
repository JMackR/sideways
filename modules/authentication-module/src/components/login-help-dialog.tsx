import { Background, Border, Button, Margin, SVG, Stack, Text } from '@upward/core-ui-library';

import { useTranslation } from 'react-i18next';
import { Dialog } from '@upward/core-ui-widgets';
import { hs } from '@upward/utilities';
import { HelpIcon } from '@upward/assets';
import { useNavigation } from '@react-navigation/native';

const HELP_ICON_SIZE = 50;

export const LoginHelpDialog = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const INNER_MARGINS = {
    marginLeftStep: hs(2),
    marginRightStep: hs(2),
  };

  return (
    <Dialog>
      <Border width={'100%'} cornerRadius="large" direction="column" {...INNER_MARGINS} color="inverseOutline">
        <Background borderRadius={5} type={'baseBackground'} />
        <Margin axisDistribution="center" marginStep={4}>
          <SVG
            tint={'primary'}
            localSVG={{
              ...HelpIcon,
              size: {
                width: HELP_ICON_SIZE,
                height: HELP_ICON_SIZE,
              },
            }}
          />
        </Margin>
        <Stack direction="column">
          <Margin direction="column" marginLeftStep={4} marginRightStep={4}>
            <Text testID="need_help" textType="headerMedium1" textAlign="center">{`${t('onboard.NEED_HELP')}
                    `}</Text>
            <Text testID="message_1" textType="bodyRegular2">
              {`${t('onboard.HELP_MESSAGE_1')}`}
              <Text testID="message_2" textType="bodyMedium2">
                {t('onboard.HELP_MESSAGE_2')}
              </Text>
              {`${t('onboard.HELP_MESSAGE_3')}
                      `}
            </Text>
            <Text testID="message_4" textType="bodyRegular2">
              {t('onboard.HELP_MESSAGE_4')}
            </Text>
          </Margin>
        </Stack>
        <Margin
          marginTopStep={6}
          marginBottomStep={4}
          direction="column"
          marginLeftStep={4}
          marginRightStep={4}
          axisDistribution="center"
        >
          <Button
            testID="close"
            buttonSize="medium"
            buttonType="primary"
            title={t('common.CLOSE_TXT')}
            onClick={async () => navigation.goBack()}
          />
        </Margin>
      </Border>
    </Dialog>
  );
};
