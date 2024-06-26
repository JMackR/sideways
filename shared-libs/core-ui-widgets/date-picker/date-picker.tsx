import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import { Dialog } from '..';
import { Margin, Text } from '@upward/core-ui-library';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@upward/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <Margin marginTopStep={2} crossAxisDistribution="center">
      <Text textType="bodyMedium1" color={'onBackground'}>
        {t('common.PICK_DATE_TXT')}
      </Text>
    </Margin>
  );
};
export const Footer = ({ footerAction }: { footerAction: () => void }) => {
  const { t } = useTranslation();
  return (
    <Margin marginBottomStep={2} crossAxisDistribution="center">
      <TouchableOpacity onPress={footerAction}>
        <Text textType="bodyMedium1" color="primary">
          {t('common.CONFIRM_TXT')}
        </Text>
      </TouchableOpacity>
    </Margin>
  );
};
export const DatePicker = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const defaultDate = useSelector((state: any) => state.benefit.benefitDateTs);
  const [date, setDate] = useState(new Date(defaultDate));

  const confirmDate = () => {
    navigation.goBack();
  };
  const dismiss = () => {
    navigation.goBack();
  };
  return (
    <Dialog onPress={dismiss}>
      <Margin direction="column" crossAxisDistribution="center">
        <Header />
        <RNDatePicker androidVariant="nativeAndroid" date={date} mode="date" onDateChange={setDate} />
        <Footer footerAction={confirmDate} />
      </Margin>
    </Dialog>
  );
};
