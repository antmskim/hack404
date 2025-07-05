import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'; 
// import { Asset } from 'expo-asset';

// const loadFonts = async () => {
//   await Asset.loadAsync(require('./assets/fonts/Fredoka-Regular.ttf'));
// };
// loadFonts().then(() => console.log('Fonts loaded'));

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen /> {/* Render the HomeScreen component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});

export default App;