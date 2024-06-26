import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Toggle } from '../toggle';

describe('Toggle component', () => {
  const tabs = [
    { key: 'tab1', label: 'Tab 1', children: <div>Tab 1</div> },
    { key: 'tab2', label: 'Tab 2', children: <div>Tab 2</div> },
    { key: 'tab3', label: 'Tab 3', children: <div>Tab 3</div> },
  ];

  it('renders correct number of tabs', () => {
    const { getAllByTestId } = render(<Toggle tabs={tabs} defaultTab="tab1" onTabPress={() => {}} />);
    expect(getAllByTestId('toggle-button')).toHaveLength(3);
  });

  it('changes active tab when clicked', () => {
    const onTabPress = jest.fn();
    const { getByText } = render(<Toggle tabs={tabs} defaultTab="tab1" onTabPress={onTabPress} />);

    fireEvent.press(getByText('Tab 2'));
    expect(onTabPress).toHaveBeenCalledWith('tab2');
  });
});
