import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from '@upward/assets';
import { Margin, Text } from '@upward/core-ui-library';
import { FlexibleRow, FlexibleRowContainer, NavigationBar, NavigationBarProps, Screen } from '@upward/core-ui-widgets';
import { FlatList } from 'react-native';

export const ManageNotifications = () => {
  const navigation = useNavigation<any>()

  const toggleOtherSelected = (bool) => {
    console.log("bool", bool);

  }
  const renderLists = ({ item }) => {
    return (
      <FlexibleRowContainer
        extendTopMargin={true}
        extendBottomMargin={true}
        extendLeftMargin={true}
        extendRightMargin={true}
        separatorTint="grey"
        skipFirstSeparator={true}
      >

        <FlexibleRow
          rightAction={{ type: 'switch', props: { state: true, onChange: toggleOtherSelected } }}
          iconTint={'brand'}
          rightArrowHidden={true}
          mainContentTint="primary"
          mainContentTextType='bodyHeavyMedium1'
          mainContent={item.title}
          testID={item.testID}

        />
      </FlexibleRowContainer>
    )
  }
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
    title: "Notifications"
  };

  return (
    <Screen safeAreaMode={'top'} screenName={'More'}>
      <NavigationBar {...navigationBarProps} />
      <FlatList
        data={[{ title: 'In App Notifications' }, { title: "Email Notifications" }]}
        renderItem={renderLists}
        testID={'More Options'}
      />
    </Screen>
  )
}
