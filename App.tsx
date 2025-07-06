import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'; 
import Map from './screens/Map'; // Import the Map screen
import Scan from './screens/Scan'; // Import the Scan screen
import ScanLegal from './screens/ScanLegal'; // Import the ScanLegal screen

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      /<ScanLegal/> 
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