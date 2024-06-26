// @ts-nocheck
import React, { useEffect } from 'react';
import { DropdownAlertViewProps } from './DropdownAlertView';
import WrapDropdownAlertView from './WrapDropdownAlertView';

export interface DropdownAlertServiceType {
  show: (content: DropdownAlertViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface DropdownAlertPropsType extends DropdownAlertViewProps {
  reference?: (data: DropdownAlertServiceType) => void;
  children: React.ReactNode;
}

// eslint-disable-next-line import/no-mutable-exports
let DropdownAlert: DropdownAlertServiceType;

export default function DropdownAlertService({ children, reference, ...defaultProps }: DropdownAlertPropsType) {
  useEffect(() => {
    reference && reference(DropdownAlert);
  }, [reference]);

  return (
    <>
      {children}
      <WrapDropdownAlertView
        {...defaultProps}
        ref={(refs) => {
          DropdownAlert = refs;
        }}
      />
    </>
  );
}

export { DropdownAlert };
