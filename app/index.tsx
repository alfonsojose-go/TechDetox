// app/index.tsx
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Change this import
import logo from '../assets/images/TechDetox_logo.png';
import StartButton from '../components/startButton';

export default function StartPage() {
  const router = useRouter(); // Use useRouter instead of useNavigation

  const handleStart = () => {
    router.push('/mainPage'); // Use router.push instead of navigation.navigate
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 200, height: 100 }} />
      <Text style={styles.title}>Welcome to Tech Detox!</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Lock down duration</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            defaultValue="5"
            placeholder="Hours"
          />
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            defaultValue="00"
            placeholder="Minutes"
          />
        </View>
        <StartButton onPress={() => router.push('/mainPage')} />
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: 80,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});