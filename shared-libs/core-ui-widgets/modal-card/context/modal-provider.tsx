import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UUID } from '@upward/utilities';
import { ModalCardProps } from '../modal-card.props';

interface ModalCardPropsDictionary {
  [index: string]: ModalCardProps;
}

export interface ModalContext {
  getModalCardProps: (modalId: string) => ModalCardProps | undefined;
  consume: (modalId: string) => void;
  show: (modal: ModalCardProps, route?: string) => void;
}

const MODAL_CONTEXT_DEFAULT: ModalContext = {
  consume: () => {},
  show: () => {},
  getModalCardProps: () => undefined,
};
const ModalContext = React.createContext<ModalContext>(MODAL_CONTEXT_DEFAULT);

const useModalContext = (): ModalContext => {
  const [modals, setModals] = useState<ModalCardPropsDictionary>({});
  const navigation = useNavigation<any>();
  const show = (modal: ModalCardProps, route?: string) => {
    const id = UUID.uuid();
    setModals({ ...modals, [id]: modal });
    const modalRoute = route === undefined ? 'MODAL_CARD' : route;

    navigation.navigate(modalRoute, { modalId: id });
  };

  const consume = (modalId: string) => {
    const props = modals[modalId];
    if (props !== undefined) {
      setModals(
        Object.keys(modals)
          .filter((key) => key !== modalId)
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: modals[key],
            };
          }, {}),
      );
    }
  };

  const getModalCardProps = (modalId: string) => {
    return modals[modalId];
  };

  return { consume, show, getModalCardProps };
};

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;
  const context = useModalContext();

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const { consume, show, getModalCardProps } = useContext(ModalContext);

  return { consume, show, getModalCardProps };
};
