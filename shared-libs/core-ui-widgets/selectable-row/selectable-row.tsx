import React from 'react';
import {
  RadioButtonSelectedDisabled,
  RadioButtonUnselectedDisabled,
  RadioButtonSelected,
  RadioButtonUnselected,
} from '@upward/assets';
import { useSelectable } from './selectable';
import { FlexibleRow, FlexibleRowProps } from '../flexible-row';
import { SelectableRowProps } from './selectable-row-props';

/**
 * A wrapper around FlexibleRow that appears as a RadioButton or CheckBox row.
 * @Important This component is dependent on having an SelectableContextProvider somehwere
 *  in its ancessor chain in order to maintain its state. Its appearance as a RadioButton or Checkbox
 *  is dependent on the multiSelect prop of SelectableContextProvider.
 * @param props Please refer to SelectableRowProps which inherit from FlexibleRowProps.
 * All of FlexibleRowProps are supported except for 'leftIcon', 'clickAction', and 'rightArrowHidden'.
 */
export const SelectableRow: React.FC<SelectableRowProps> = (props) => {
  const {
    selectId,
    onWillSelect,
    onDidSelect,
    onWillDeselect,
    onDidDeselect,
    disabled,
    overrideSelected,
    noIcon,
    customComponent,
    ...rest
  } = props;
  const { isSelected, select, deselect, multiSelect } = useSelectable();
  const currentlySelected = overrideSelected !== undefined ? overrideSelected : isSelected(selectId);
  const icon = iconToDisplay(multiSelect, !!disabled, currentlySelected);
  const rowClickAction = React.useCallback(() => {
    if (disabled) {
      return;
    }
    if (currentlySelected) {
      onWillDeselect && onWillDeselect(selectId);
      deselect(selectId);
      onDidDeselect && onDidDeselect(selectId);
    } else {
      onWillSelect && onWillSelect(selectId);
      select(selectId);
      onDidSelect && onDidSelect(selectId);
    }
  }, [
    currentlySelected,
    selectId,
    disabled,
    onWillDeselect,
    deselect,
    onDidDeselect,
    onWillSelect,
    select,
    onDidSelect,
  ]);

  const rowProps: FlexibleRowProps = {
    ...rest,
    rightIcon: noIcon ? undefined : { ...icon, type: 'svg' },
    clickAction: rowClickAction,
    rightArrowHidden: true,
    isSelected: currentlySelected,
  };
  if (customComponent) return customComponent({ ...rowProps });
  return <FlexibleRow {...rowProps} />;
};

const iconToDisplay = (multiSelect: boolean, disabled: boolean, currentlySelected: boolean) => {
  if (multiSelect) {
    if (disabled) {
      return currentlySelected ? RadioButtonSelectedDisabled : RadioButtonUnselectedDisabled;
    } else {
      return currentlySelected ? RadioButtonSelected : RadioButtonUnselected;
    }
  } else {
    if (disabled) {
      return currentlySelected ? RadioButtonSelectedDisabled : RadioButtonUnselectedDisabled;
    } else {
      return currentlySelected ? RadioButtonSelected : RadioButtonUnselected;
    }
  }
};
