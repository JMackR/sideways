import { Border, Margin } from '@upward/core-ui-library';
import { SelectableContextProvider, SelectableRow, SelectableRowProps } from '@upward/core-ui-widgets';
import { useRef, useState } from 'react';
import { SceneObject } from '../onboarding-coordinator/onboarding-types';
import { FlatList } from 'react-native';
import { SocialCard } from './social-card';

export const SocialSelect = ({ options }: SceneObject) => {
  const [initialItem, setInitialItem] = useState<string[]>(['001', '002']);
  const selectSocialRef = useRef(null);

  const setSelectedItem = (item: any) => {
    console.log('setSelectedItem', item);
  };

  const setDeselected = (item: any) => {
    console.log('setDeselected', item);
  };
  const renderItem = ({ item, index }) => {
    const props: SelectableRowProps = {
      selectId: item.id,
      mainContent: item,
      onDidSelect: () => {
        setSelectedItem(item);
      },
      onDidDeselect: () => {
        setDeselected(item);
      },
    };

    return (
      <Margin key={`${index}-${item.id}`} direction={'column'} grow={1} marginBottomStep={3}>
        <Border color={item.isSelected ? 'primary' : 'onBackground'} cornerRadius={'large'}>
          <SelectableRow {...props} selectId={item.id} customComponent={SocialCard} />
        </Border>
      </Margin>
    );
  };

  return (
    <Margin direction="column" marginTopStep={4}>
      <SelectableContextProvider multiSelect={true} initialSelections={initialItem}>
        <FlatList ref={selectSocialRef} data={options} renderItem={renderItem} />
      </SelectableContextProvider>
    </Margin>
  );
};
