import { CloseIcon } from '@upward/assets';
import { Button, Margin, SVG, Stack, Text, Touchable } from '@upward/core-ui-library';
import { Dialog, DropdownAlert } from '@upward/core-ui-widgets';
import { useNavigation, useRoute } from '@react-navigation/native';
import Share from 'react-native-share';

import { useTranslation } from 'react-i18next';

import {
  AnalyticsActionType,
  AnalyticsController,
  AnalyticsElementType,
  AnalyticsEvent,
  AnalyticsI,
} from '@upward/analytics';
import { Platform } from 'react-native';

export const ShareModal = () => {
  const route = useRoute();
  const { idCard }: any = route?.params;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const getFileExtension = (filename: string) => filename?.split('.')[1]?.toUpperCase();

  const dismiss = () => {
    navigation.goBack();
  };
  const onClose = () => {
    navigation.goBack();
  };

  const analyticsEvent = ({ eventName, elementName, elementType }: AnalyticsI) => {
    AnalyticsController.trackClickableEvent({
      screenName: SHARE_MODAL,
      eventName,
      elementName,
      elementType,
      actionType: AnalyticsActionType.Click,
    });
  };
  const onContinue = () => {
    dismiss();
    analyticsEvent({
      eventName: AnalyticsEvent.Share_Continue,
      elementName: AnalyticsEvent.Share_Continue_Button,
      elementType: AnalyticsElementType.Button,
    });
    shareImages();
  };
  const convertToObjects = (paths) => {
    return paths.map((path) => {
      const compressFilePath = `file://${path}`;
      return { compressFilePath };
    });
  };
  const shareImages = async () => {
    const { mobileIdCardDetails } = idCard;
    const base64ImageUrls =
      mobileIdCardDetails?.map((detail) => {
        const isValidFile = IMAGE_FILE_TYPES?.includes(getFileExtension(detail?.actualFileName));
        return isValidFile ? `data:image/${detail?.actualFileName?.split('.')[0]};base64,${detail?.uploadFile}` : null;
      }) || [];
    const fileNames: string[] =
      mobileIdCardDetails?.map((detail) =>
        detail.actualFileName.includes('_') ? detail.actualFileName.split('_')[1] : detail.actualFileName,
      ) || [];

    const tempFilePaths: string[] = [];

    const convertToTempFiles: Promise<void[]> = Promise.all(
      base64ImageUrls.map((base64ImageUrl, index) => {
        if (base64ImageUrl) {
          const base64Data: string = base64ImageUrl?.split(';base64,').pop()!;
          const tempFilePath: string = `${RNFS.TemporaryDirectoryPath}/${fileNames?.[index]}`;
          return RNFS.writeFile(tempFilePath, base64Data, 'base64')
            .then(() => tempFilePaths.push(tempFilePath))
            .catch((err: Error) => {
              console.error('error', err);
            });
        }
      }),
    );
    try {
      await convertToTempFiles.then(async () => {
        const formattedPaths = convertToObjects(tempFilePaths);
        await Share.open({ failOnCancel: false, urls: tempFilePaths.map((tempFilePath) => `file://${tempFilePath}`) })
          .then((res) => {
            clearTempDirectory(formattedPaths);
            analyticsEvent({
              eventName: `${AnalyticsEvent.Share_Complete}_${Platform.OS === 'ios' ? res?.message : res?.success}`,
              elementName: AnalyticsEvent.Share_Button,
              elementType: AnalyticsElementType.Button,
            });
          })
          .catch(() => {
            DropdownAlert.show({
              title: 'Share Failed',
              message: `${t('documents.SHARE_UPLOAD_FAILED_TXT')}`,
              type: 'error',
              autoHide: true,
            });
          });
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <Dialog onPress={dismiss}>
      <Margin direction="column" marginTopStep={2} marginLeftStep={4} marginRightStep={4}>
        <Margin crossAxisDistribution="center" axisDistribution="space-between" marginTopStep={4}>
          <Text testID="Share_Carefully" textType="headerMedium1">
            {SHARE_CAREFULLY}
          </Text>
          <Touchable testID="Close_Button" onPress={() => onClose()}>
            <SVG
              localSVG={{
                SVG: CloseIcon.SVG,
                size: { width: 20, height: 20 },
              }}
              tint="onBackground"
            />
          </Touchable>
        </Margin>
        <Margin marginBottomStep={2} marginTopStep={2} crossAxisDistribution="center" axisDistribution="center">
          <Stack direction="column" childSeparationStep={2}>
            <Margin direction="column" marginTopStep={2} marginBottomStep={2}>
              <Text testID="Share_Description" textType="bodyRegular1">
                {SHARE_DESCRIPTION}
              </Text>
            </Margin>
            <Button
              accessibilityLabel="Continue_Button"
              testID="Continue_Button"
              title={CONTINUE}
              buttonSize="medium"
              buttonType="primary"
              weight="bodyMedium1"
              onClick={async () => onContinue()}
            />
            <Button
              accessibilityLabel="Cancel_Button"
              testID="Cancel_Button"
              title={CANCEL}
              buttonType="text"
              buttonSize="medium"
              titleColor="onBackground"
              weight="bodyMedium1"
              onClick={async () => onClose()}
            />
          </Stack>
        </Margin>
      </Margin>
    </Dialog>
  );
};
