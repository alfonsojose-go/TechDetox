// app/index.tsx
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import logo from '../assets/images/TechDetox_logo.png';
import StartButton from '../components/startButton';

export default function StartPage() {
  const router = useRouter();
  const [hours, setHours] = useState('5');
  const [minutes, setMinutes] = useState('00');

  const handleStart = () => {
    // Convert to numbers and validate
    const hoursNum = parseInt(hours) || 0;
    const minutesNum = parseInt(minutes) || 0;
    
    // Calculate total minutes for the countdown
    const totalMinutes = hoursNum * 60 + minutesNum;
    
    router.push({
      pathname: '/mainPage',
      params: { 
        initialHours: hoursNum,
        initialMinutes: minutesNum,
        totalMinutes: totalMinutes
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 200, height: 175}} />
      <Text style={styles.title}>Welcome to Tech Detox!</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Lock down duration</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
            placeholder="Hours"
          />
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="Minutes"
          />
        </View>
        <StartButton onPress={handleStart} />
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
});