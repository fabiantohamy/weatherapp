import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content
          title="Weather Forecast"
          style={styles.appbarContent}
        />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbarContent: {
    alignItems: 'center',
  },
});
