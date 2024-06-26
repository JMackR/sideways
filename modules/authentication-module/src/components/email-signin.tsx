import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FaceIDIcon, FingerprintIcon } from '@upward/assets';
import { Background, Flex, LocalImage, Margin, Text } from '@upward/core-ui-library';
import { isTablet, useScale } from '@upward/utilities';
import { useContext } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Button } from '@upward/core-ui-library/button';
import { ValidatedFormButton, ValidatedFormContext, ValidatedInput } from '@upward/core-ui-widgets';
import { NavigableRoute } from '@upward/navigation';
import { useColorTheme } from '@upward/themes';
import { useTranslation } from 'react-i18next';
import { useSignIn } from '../hooks/useSignin';

export const EmailSignin = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { ms } = useScale(dimensions);
  const navigation = useNavigation<any>();
  const { error } = useContext(ValidatedFormContext);
  const { signInWithBioMetrics, setEmail, signInWithEmail, email, setPassword, loading, isBiometricsEnabled } =
    useSignIn({ error });
  const isFocused = useIsFocused();
  const theme = useColorTheme();

  const biometricIcon = Platform.OS === 'ios' ? FaceIDIcon : FingerprintIcon;

  const BASE_MARGINS = {
    marginLeftStep: isTablet ? ms(10) : ms(5),
    marginRightStep: isTablet ? ms(10) : ms(5),
  };

  return (
    <Margin direction="column">
      <LocalImage source={require('./images/image1.png')} width={300} height={200} resizeMode="contain" />
      <Margin shrink={0} direction="column" crossAxisDistribution="center" marginBottomStep={2} marginTopStep={8}>
        <Text textType="headerMedium1" color="primary" textAlign="center">
          {t('onboard.SIGN_IN')}
        </Text>
      </Margin>
      <Margin direction="column" {...BASE_MARGINS}>
        <Flex width={'100%'} direction="column" style={{ flexShrink: 0 }}>
          <Margin shrink={0} direction="column" marginStep={4}>
            <ValidatedInput
              title={'Email'}
              roleProp="email"
              placeholder="Enter email"
              textChangeHandler={(text) => setEmail(text)}
              keyboardType="email-address"
              returnKeyType="done"
              trailingIcon={!loading && isBiometricsEnabled && isFocused ? biometricIcon : undefined}
              onClick={() => signInWithBioMetrics()}
              textColor={'primary'}
              tintColor={'primary'}
              borderColor={'clear'}
              textType="bodyRegular2"
            />
          </Margin>

          <Margin shrink={0} direction="column" marginStep={4}>
            <ValidatedInput
              title={'Password'}
              roleProp="password"
              placeholder="Enter password"
              textChangeHandler={(text) => setPassword(text)}
              keyboardType="default"
              returnKeyType="done"
              borderColor={'clear'}
              trailingIcon={!loading && isBiometricsEnabled && isFocused ? biometricIcon : undefined}
              onClick={() => signInWithBioMetrics()}
              textColor={'primary'}
              tintColor={'primary'}
              textType="bodyRegular2"
              secureTextEntry={true}
            />
          </Margin>
          <Margin shrink={0} direction="column" marginBottomStep={4} crossAxisDistribution="flex-end">
            <Button
              title={'Forgot password?'}
              accessibilityLabel={t('onboard.NEED_HELP')}
              titleColor="primary"
              titleSize={16}
              buttonSize="small"
              buttonType="text"
              onClick={async () => navigation.navigate(NavigableRoute.LOGIN_HELP)}
            />
          </Margin>
          <Margin shrink={0} direction="column" marginStep={4} marginTopStep={20}>
            <ValidatedFormButton
              onPress={() => signInWithEmail()}
              // loading={loading}
              title={t('onboard.SIGN_IN_BUTTON')}
              buttonSize="large"
              buttonType={email?.length === 0 ? 'disabled' : 'primary'}
              accessibilityLabel={t('onboard.SIGN_IN_BUTTON')}
              // disabled={email?.length === 0}
              loader
            />
          </Margin>
        </Flex>
      </Margin>
    </Margin>
  );
};
