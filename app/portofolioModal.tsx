import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Text, View } from '@/components/Themed';
import NewPortofolioContentModal from '@/components/Account/PortofolioContents/NewPortofolioContentModal';

export default function PotofolioModal() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <NewPortofolioContentModal />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
