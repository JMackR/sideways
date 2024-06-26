import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, } from '@upward/assets';
import { Input, Margin, Text, Button } from '@upward/core-ui-library';
import { NavigationBar, NavigationBarProps, Screen, } from '@upward/core-ui-widgets';
import { NavigableRoute } from '@upward/navigation';
import { BASE_MARGINS, } from './constants';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { Gender } from './gender-widget';

export const ManageProfile = () => {
  const [fields, setFields] = useState({ gender: true })
  const navigation = useNavigation<any>()

  const leftItems = [{
    icon: ChevronLeftIcon, pressHandler: () => navigation.goBack()
  }];

  const onFieldChange = (valueObj) => {
    const text = valueObj.text
    const bob = { ...fields, [valueObj.fieldName]: text }
    setFields(bob)
  }

  const navigationBarProps: NavigationBarProps = {
    testID: 'home-screen.navigation-bar',
    barItemsTint: 'brandAlt',
    backgroundColor: "brand",
    isRootNavBar: false,
    leftItems: leftItems,
    isMain: false,
    title: "Profile"
  };

  const editFields = [{ title: 'Name', fieldName: 'name', keyboardType: "default", value: "BOB" },
  { title: 'Display Name', fieldName: 'display-name', keyboardType: "default", value: 'bobby' },
  { title: 'Phone', fieldName: 'phone', keyboardType: "email-address", value: "555-555-5555" },
  { title: 'Password ', fieldName: 'password', keyboardType: "default", value: "123456", secureEntry: true },
  { title: 'Birthday', fieldName: 'birthday', keyboardType: "default", value: "05/12/1967" }
  ]

  return (
    <Screen safeAreaMode="top" screenName={NavigableRoute.MANAGE_PROFILE}>
      <NavigationBar {...navigationBarProps} />
      <Margin direction='column' {...BASE_MARGINS}>
        <Text textType='headerBold2'>ManageProfile</Text>
        <Margin direction="column" >
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
            {editFields.map((field) => {
              const value = fields[field.fieldName]
              return (
                <Margin key={field.title} shrink={0} direction="column" marginStep={1} >
                  <Input
                    text={value !== undefined ? value : field.value}
                    title={field.title}
                    textChangeHandler={(text) => onFieldChange({ fieldName: field.fieldName, text })}
                    keyboardType={field.keyboardType}
                    returnKeyType="done"
                    textColor={'primary'}
                    tintColor={'primary'}
                    borderColor={'clear'}
                    textType="bodyRegular2"
                    secureTextEntry={field.secureEntry}
                  />
                </Margin>)
            })}
            <Gender fields={fields} onFieldChange={onFieldChange} />
            <Margin direction='column' marginStep={1}>
              <Button buttonSize='large' buttonType='primary' title="Save Changes" />
            </Margin>
          </ScrollView>
        </Margin>
      </Margin>
    </Screen>
  );
};
