import React from 'react';
import { useTranslation } from 'react-i18next';
import { Margin, Text } from '@upward/core-ui-library';
import { MARGIN_GUTTER_FACTOR } from '@upward/constants';

export const NoResults = () => {
  const { t } = useTranslation();
  return (
    <Margin direction="row" marginStep={MARGIN_GUTTER_FACTOR}>
      <Text testID="noResultsText" textType="bodyRegular1">
        {t('member.NO_RESULTS_TXT')}
      </Text>
    </Margin>
  );
};
