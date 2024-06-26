import React from 'react';
import invariant from 'invariant';
import { ModalCard } from './modal-card';
import { ModalCardHostProps } from './modal-card-host.props';
import { ModalCardProps } from './modal-card.props';
import { useNavigation } from '@react-navigation/native';

/**
 * Model host is responsible for rendering essentially a blank screen, that renders both the modal card, and the overlay that gets darker as the card moves up.
 * @param props
 */
export const ModalCardHost = (props: ModalCardHostProps) => {
  const { modalProps } = props;

  invariant(modalProps !== undefined, 'modal_props must be defined');

  return <RenderOnlyModal {...modalProps} />;
};

const RenderOnlyModal: React.FC<ModalCardProps> = (props) => {
  const onCloseStart = () => {};
  const navigation = useNavigation();
  const onCloseEnd = () => {
    navigation.goBack();
  };

  const onOpenEnd = () => {};

  return <ModalCard onOpenEnd={onOpenEnd} onCloseEnd={onCloseEnd} {...props} />;
};
