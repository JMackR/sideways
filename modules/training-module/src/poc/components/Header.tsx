import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, Vibration, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const Header = (props: { navigation: any; title: string }) => {
  const navigation = props.navigation;
  const [flashlight, setFlashlight] = useState(false as boolean);

  const handleFlash = () => {};

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} style={[styles.icon, styles.back]} size={30} />
      </TouchableOpacity>

      <Text style={styles.brand}>{props.title}</Text>

      <TouchableOpacity onPress={() => handleFlash()} activeOpacity={0.6} style={styles.bulb}>
        <FontAwesomeIcon icon={faLightbulb} style={styles.icon} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF474C',
    height: '8%',
    paddingHorizontal: 15,
    marginTop: '10%',
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    color: 'white',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  brand: {
    color: 'white',
    fontSize: 25,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: '700',
  },
  bulb: {
    marginLeft: 'auto',
  },
  back: {
    marginRight: 10,
  },
});
