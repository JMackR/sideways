// @ts-nocheck

import { View, Modal, StyleSheet } from 'react-native';

interface ModalCustomProps {
  nativeModal?: boolean;
  visible?: boolean;
  onDismiss?: () => void;
  zIndex?: number | null;
}

export default function ModalCustom(props?: ModalCustomProps) {
  const { children, nativeModal, visible, onDismiss, zIndex } = props;

  if (nativeModal) {
    return (
      <Modal pointerEvents="box-none" visible={visible} transparent animationType="none" onDismiss={onDismiss}>
        {children}
      </Modal>
    );
  }

  if (!visible) return null;

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, { zIndex }]}>
      {children}
    </View>
  );
}
