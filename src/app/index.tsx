import React from 'react';
import { registerRootComponent } from 'expo';
import { SafeAreaView, StyleSheet } from 'react-native';
import FeedBackForm from './component/FeedBackForm';


const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedBackForm/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Background color
  },
});

// Register the root component
registerRootComponent(App);

export default App;
