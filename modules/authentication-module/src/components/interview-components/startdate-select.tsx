import { Margin, Text, Stack, Overlay } from '@upward/core-ui-library';
import { Toggle } from '@upward/core-ui-widgets';
import { useState } from 'react';

import DatePicker from 'react-native-date-picker';

export const StartDateSelect = () => {
  const [race, setRace] = useState(false);

  return (
    <Margin direction="column">
      <Margin marginStep={4}>
        <Stack direction="row" childSeparationStep={1}>
          <Margin marginStep={4}>
            <Toggle title="" state={race} onChange={(e) => setRace(e)} testID="sw-address-toggle" />
          </Margin>
          <Margin marginStep={4} marginLeftStep={2} marginRightStep={2}>
            <Text textType="bodyBold1" color={race ? 'primary' : 'disabled'}>
              I am training for a race
            </Text>
          </Margin>
        </Stack>
      </Margin>
      <Margin>
        {race && (
          <Overlay crossAxisDistribution="flex-start" insetLeftStep={6}>
            <Text textType="bodyBold1" color="primary">
              Enter Race Date:
            </Text>
          </Overlay>
        )}
        <Margin crossAxisDistribution="center" marginTopStep={4}>
          <DatePicker style={{ flex: 1 }} minimumDate={new Date()} mode={'date'} date={new Date()} />
        </Margin>
      </Margin>
    </Margin>
  );
};
