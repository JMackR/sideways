import { isEmpty } from '..';

export type Validator = (value?: string) => Promise<void>;

export interface WithValidatorsProps {
  /**
   * List of validators for the component.
   */
  validators: Validator[];
  validateOnChange?: boolean;
  validatedOnChangeAction?: (value?: string) => void;
}

export const RegexValidator =
  (regex: RegExp, message: string, allowEmpty = true): Validator =>
  async (value?: string) => {
    if (allowEmpty && isEmpty(value)) {
      return;
    }
    if (!regex.test(value || '')) {
      throw new Error(message);
    }
  };

export const RegexValidatorWithValue =
  (regex: RegExp, prefix: string, maxLength: string, suffix: string, allowEmpty = true): Validator =>
  async (value?: string) => {
    if (allowEmpty && isEmpty(value)) {
      return;
    }
    if (!regex.test(value || '')) {
      throw new Error(prefix + maxLength + suffix);
    }
  };

export const RequiredValidator: Validator = async (value?: string) => {
  if (!value) {
    throw new Error('Field Required');
  }
};

export const EmailValidator = async (value?: string) => {
  const MAX_PREFIX_LENGTH = 64;
  const MAX_SUFFIX_LENGTH = 253;

  if (isEmpty(value)) {
    return;
  }

  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value!)) {
    throw new Error('Invalid Email Address');
  }

  // Cannot start with a special character
  regex = /^[^a-zA-Z0-9]/;
  if (regex.test(value!)) {
    throw new Error('Invalid Email Address');
  }

  const parts = value!.split('@');
  if (parts[0].length > MAX_PREFIX_LENGTH || parts[1].length > MAX_SUFFIX_LENGTH) {
    throw new Error('Invalid Email Address');
  }
};

export const PhoneValidator = RegexValidator(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  'Invalid Email Address',
);

export const MinLengthValidator = (length: number) => {
  const regex = RegExp(`^.{${length},}$`);
  const allowEmpty = length === 0;
  return RegexValidatorWithValue(
    regex,
    'validation.length-prefix',
    ` ${length} `,
    'validation.length-more',
    allowEmpty,
  );
};
export const MaxLengthValidator = (length: number) => {
  const regex = new RegExp(`^.{0,${length}}$`);
  return RegexValidatorWithValue(regex, 'validation.length-prefix', ` ${length} `, 'validation.length-fewer');
};

export const nameValidator = RegexValidator(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,35}$/,
  'validation.invalid-name',
  false,
);
