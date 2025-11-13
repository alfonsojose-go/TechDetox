
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MainPage() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Date</Text>
        <Text>Time</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Lockdown</Text>
        <Text>Your app content goes here...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});