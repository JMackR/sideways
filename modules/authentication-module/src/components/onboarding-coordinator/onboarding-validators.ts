import { OnboardingValidationKey } from '../wizard-provider';
import _ from 'lodash';

export const getOnboardingValidators = () => {
  const validators: { [key in OnboardingValidationKey]: (data: any, screenIndex: any) => any | undefined } = {
    toggle: (data, screenIndex) => {
      const toggle = data.toggle;

      if (!toggle) {
        return 'translate error message';
      }

      for (let key in toggle) {
        if (toggle[key]?.screenIndex === screenIndex && toggle[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    input: (data, screenIndex) => {
      const input = data.input;

      if (!input) {
        return 'translate error message';
      }

      for (let key in input) {
        if (input[key]?.screenIndex === screenIndex && input[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    firstName: (data, screenIndex) => {
      const firstName = data.firstName;

      if (!firstName) {
        return 'translate error message';
      }

      for (let key in firstName) {
        if (firstName[key]?.screenIndex === screenIndex && firstName[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    lastName: (data, screenIndex) => {
      const lastName = data.lastName;

      if (!lastName) {
        return 'translate error message';
      }

      for (let key in lastName) {
        if (lastName[key]?.screenIndex === screenIndex && lastName[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    name: (data, screenIndex) => {
      const name = data.name;

      if (!name) {
        return 'translate error message';
      }

      for (let key in name) {
        if (name[key]?.screenIndex === screenIndex && name[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    phone: (data, screenIndex) => {
      const phone = data.phone;

      if (!phone) {
        return 'translate error message';
      }

      for (let key in phone) {
        if (phone[key]?.screenIndex === screenIndex && phone[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    date: (data, screenIndex) => {
      const date = data.date;

      if (!date) {
        return 'translate error message';
      }

      for (let key in date) {
        if (date[key]?.screenIndex === screenIndex && date[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    time: (data, screenIndex) => {
      const time = data.time;

      if (!time) {
        return 'translate error message';
      }

      for (let key in time) {
        if (time[key]?.screenIndex === screenIndex && time[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    year: (data, screenIndex) => {
      const year = data.year;

      if (!year) {
        return 'translate error message';
      }

      for (let key in year) {
        if (year[key]?.screenIndex === screenIndex && year[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    make: (data, screenIndex) => {
      const make = data.make;

      if (!make) {
        return 'translate error message';
      }

      for (let key in make) {
        if (make[key]?.screenIndex === screenIndex && make[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    model: (data, screenIndex) => {
      const model = data.model;

      if (!model) {
        return 'translate error message';
      }

      for (let key in model) {
        if (model[key]?.screenIndex === screenIndex && model[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    number: (data, screenIndex) => {
      const number = data.number;

      if (!number) {
        return 'translate error message';
      }

      for (let key in number) {
        if (number[key]?.screenIndex === screenIndex && number[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    pill: (data, screenIndex) => {
      const pill = data.pill;

      if (!pill) {
        return 'translate error message';
      }

      for (let key in pill) {
        if (pill[key]?.screenIndex === screenIndex && pill[key]?.response) {
          return undefined;
        } else {
          return 'translate error message';
        }
      }
    },
    multiFirstLastName: (data, screenIndex) => {
      const multiFirstLastName = data.multiFirstLastName;

      if (!multiFirstLastName) {
        return 'translate error message';
      }

      for (let key in multiFirstLastName) {
        if (multiFirstLastName[key]?.screenIndex === screenIndex && multiFirstLastName[key]?.response) {
          let noData = false;
          // TODO: Type
          multiFirstLastName[key]?.response.forEach((r: { firstName: string; lastName: string }) => {
            if (!r.firstName || !r.lastName) {
              noData = true;
            }
          });

          if (noData) {
            return 'translate ERROR not all fields entered';
          } else {
            return undefined;
          }
        } else {
          return 'translate error message';
        }
      }
    },
    multiVehicles: (data, screenIndex) => {
      const multiVehicles = data.multiVehicles;

      if (!multiVehicles) {
        return 'translate error message';
      }

      for (let key in multiVehicles) {
        if (multiVehicles[key]?.screenIndex === screenIndex && multiVehicles[key]?.response) {
          let noData = false;
          // TODO: Type
          multiVehicles[key]?.response.forEach((r: { vehicleInfo: string }) => {
            if (!r.vehicleInfo) {
              noData = true;
            }
          });

          if (noData) {
            return 'translate ERROR not all fields entered';
          } else {
            return undefined;
          }
        } else {
          return 'translate error message';
        }
      }
    },
  };
  return { validators };
};
