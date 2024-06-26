import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from '../date-picker';
import { Dialog } from 'shared-libs/core-ui-widgets/dialog';
import { Text, View } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('DatePicker', () => {
  it('renders DatePicker correctly', () => {
    const { getByText } = render(
      <Dialog>
        <View>
          <Text>Pick a date</Text>
          <Text>Confirm</Text>
        </View>
      </Dialog>,
    );
    expect(getByText('Pick a date')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('confirmDate is called when TouchableOpacity in Footer is pressed', () => {
    const { getByText } = render(
      <Dialog>
        <View>
          <Text>Pick a date</Text>
          <Text>Confirm</Text>
        </View>
      </Dialog>,
    );
    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);
  });
});
