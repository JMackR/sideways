import { Button, Margin, Overlay, Separator, Stack, Text } from '@upward/core-ui-library';
import { Screen, Avatar, NavigationBar, NavigationBarProps } from '@upward/core-ui-widgets';
import { NavigableRoute } from '@upward/navigation';
import { useColor } from '@upward/themes';
import { BadgePosition } from '@upward/core-ui-widgets/avatar';
import { CameraIcon, ChevronLeftIcon, LogoutIcon, UserIcon } from '@upward/assets';
import { BASE_MARGINS, } from './constants';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';


import { ActionSheetIOS, Platform, Alert, } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  type CameraOptions,
  type ImageLibraryOptions,
  type ImagePickerResponse,
} from 'react-native-image-picker';


const userData = { avatar: true, name: 'JIM BOBBBBBBBB', imageUrl: 'https://picsum.photos/id/237/200/300', email: "bob@bob.com" };


export interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

export const ProfileMain = () => {
  const navigation = useNavigation<any>()
  const { colors } = useColor();
  const MAX_CHARACTER_COUNT = 100;
  const imageUriRef = useRef<string | undefined>(undefined);
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [displayName, setDisplayName] = useState<string | undefined>();
  const [about, setAbout] = useState<string | undefined>();
  const displayNameRef = useRef(displayName);
  const aboutRef = useRef(about);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);


  const pressMe = async () => {
    console.log('press me');
  };
  const openCamera = async () => {
    await launchCamera(actions[0] as unknown as CameraOptions, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorCode) {
        if (response.assets) {
          imageUriRef.current = response.assets[0].uri;
          setImageUri(response.assets[0].uri);
        }
      }
    });
  };

  const openImageGallery = async () => {
    await launchImageLibrary(actions[1] as unknown as ImageLibraryOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode + ', ' + response.errorMessage);
      } else {
        if (response.assets) {
          imageUriRef.current = response.assets[0].uri;
          setImageUri(response.assets[0].uri);
        }
      }
    });
  };

  const handleAvatarPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            openCamera();
          } else if (buttonIndex === 2) {
            openImageGallery();
          }
        },
      );
    } else {
      Alert.alert('Select a Photo', '', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: openCamera },
        { text: 'Choose from Library', onPress: openImageGallery },
      ]);
    }
  };
  const leftItems = [{
    icon: ChevronLeftIcon, pressHandler: () => navigation.goBack()
  }];

  const navigationBarProps: NavigationBarProps = {
    testID: 'home-screen.navigation-bar',
    barItemsTint: 'brandAlt',
    backgroundColor: "brand",
    isRootNavBar: false,
    leftItems: leftItems,
    isMain: false,
    title: "Profile"
  };
  return (
    <Screen safeAreaMode="top" screenName={NavigableRoute.PROFILE_MAIN}>
      <NavigationBar {...navigationBarProps} />
      <Margin grow={1} direction='column' {...BASE_MARGINS} >
        <Margin direction='row'>
          <Avatar
            name={userData.name}
            imageSize={'small'}
            containerStyle={{ backgroundColor: colors.brand }}
            source={userData.imageUrl}
            badgeProps={{
              icon: CameraIcon,
              onPress: handleAvatarPress,
              iconTint: 'brand',
              borderWidth: 1,
              borderColor: "blue",
              backgroundColor: "#fff",
              size: 25,
            }}
            badgePosition={BadgePosition.TOP_RIGHT}
          />
          <Margin grow={1} direction='column' crossAxisDistribution='center' axisDistribution='center'>
            <Stack direction='column' childSeparationStep={2}>
              <Text>{userData.name}</Text>
              <Text>{userData.email}</Text>
            </Stack>
          </Margin>
        </Margin>
        <Margin direction='row' crossAxisDistribution='center' axisDistribution='center' marginTopStep={10} >
          <Button title='Edit Profile' buttonSize='medium' buttonType='primary' leftIcon={UserIcon} onClick={() => navigation.navigate(NavigableRoute.MANAGE_PROFILE)} />
        </Margin>
        <Margin direction='column' crossAxisDistribution='flex-start' axisDistribution='center' marginTopStep={10} >
          <Button title='Notifications' buttonSize='large' buttonType='text' onClick={() => navigation.navigate(NavigableRoute.NOTIFICATIONS_MANAGEMENT)} />
          <Button title='Biometrics' buttonSize='large' buttonType='text' onClick={() => navigation.navigate(NavigableRoute.BIOMETRICS_MANAGEMENT)} />
          <Button title='Support' buttonSize='large' buttonType='text' onClick={async () => console.log("click")} />
        </Margin>
        <Overlay insetBottomStep={20} width={"100%"}>
          <Separator direction='column' />
          <Margin crossAxisDistribution='flex-start' axisDistribution='flex-start'>
            <Button title='Sign out' buttonSize='large' buttonType='text' leftIcon={LogoutIcon} />
          </Margin>
        </Overlay>
      </Margin>
    </Screen>
  );
};
