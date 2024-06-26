import { Border, Button, Margin } from '@upward/core-ui-library';
import { SceneObject } from '../onboarding-coordinator/onboarding-types';
import { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { SelectableContextProvider, SelectableRow, SelectableRowProps } from '@upward/core-ui-widgets';

export const SingleSelect = ({ options, textFields }: SceneObject) => {
  const [initialItem, setInitialItem] = useState<string>('0');

  const selectRef = useRef(null);
  const setSelectedItem = (item: any) => { };

  const setDeselected = (item: any) => { };

  const renderItem = ({ item, index }) => {
    const props: SelectableRowProps = {
      selectId: item.id,
      mainContent: item.text,
      onDidSelect: () => {
        setSelectedItem(item);
      },
      onDidDeselect: () => {
        setDeselected(item);
      },
    };

    return (
      <Margin key={`${index}-${item.id}`} direction={'column'} grow={1} marginBottomStep={3} style={{ minHeight: 300 }}>
        <Border color={item.isSelected ? 'primary' : 'onBackground'} cornerRadius={'large'}>
          <SelectableRow
            {...props}
            doNotApplyHorizontalPadding={false}
            mainContent={item.text.text}
            selectId={item.id}
            iconTint={item.isSelected ? 'brand' : 'disabled'}
            mainContentTint={'primary'}
            mainContentTextType={'bodyRegular1'}
            transparentBg={true}
          />
        </Border>
      </Margin>
    );
  };
  return (
    <Margin grow={1} direction="column" axisDistribution="center" marginTopStep={10} marginBottomStep={10}>
      <SelectableContextProvider multiSelect={false} initialSelections={[initialItem]}>
        <FlatList ref={selectRef} data={options} renderItem={renderItem} />
      </SelectableContextProvider>
      {textFields && textFields[0]?.text == 'View all Growth Plans' && (
        <Margin grow={1} direction="column" crossAxisDistribution="center" marginTopStep={10} marginBottomStep={10}>
          <Button
            buttonSize="small"
            titleColor={'brand'}
            buttonType="text"
            title={textFields && textFields[0].text}
            onClick={() => console.log('hi bob navigate me')}
          />
        </Margin>
      )}
    </Margin>
  );
};
