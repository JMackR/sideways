import { ChevronLeftIcon } from '@upward/assets';
import { SVG } from '@upward/core-ui-library';
import { isIOS, ms, vs } from '@upward/utilities';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container} testID={'backButton'}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <SVG
          localSVG={{
            SVG: ChevronLeftIcon.SVG,
            size: { width: vs(18), height: vs(18) },
          }}
          tint="alwaysLight"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
  button: {
    width: vs(26),
    height: ms(26),
    borderRadius: ms(15),
    backgroundColor: 'rgba(0,0,0,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isIOS ? 0 : 2,
  },
});
