import { forwardRef, useState, useEffect } from 'react';
import { WithValidatorsProps } from '@upward/utilities';
import IMask from 'imask';
import { TextEntryRef } from '../text-entry';
import { Input } from './input';
import { InputProps } from './input.props';

export const MaskedInput = forwardRef<TextEntryRef, InputProps & WithValidatorsProps & { mask: string }>(
  (props, ref) => {
    const { textChangeHandler, mask, text: defaultValue, testID, ...rest } = props;
    const [value, setValue] = useState<string | undefined>();

    const iMask = IMask.createMask({ mask });

    useEffect(() => {
      const maskedValue = iMask.resolve(defaultValue || '');
      setValue(maskedValue);
    }, [defaultValue]);

    const onChange = (text?: string) => {
      const maskedValue = iMask.resolve(text || '');
      setValue(maskedValue);
      textChangeHandler && textChangeHandler(iMask.unmaskedValue);
    };

    return <Input ref={ref} {...rest} text={value} textChangeHandler={onChange} testID={testID} />;
  },
);
