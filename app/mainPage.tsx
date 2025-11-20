import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MainPage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const initialHours = parseInt(params.initialHours as string) || 5;
  const initialMinutes = parseInt(params.initialMinutes as string) || 0;
  const totalMinutes = parseInt(params.totalMinutes as string) || 300;

  const [timeLeft, setTimeLeft] = useState(totalMinutes * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(true);

  // Function to navigate to index page
  const navigateToIndex = () => {
    router.replace('/');
  };

  // Function to navigate to emergency page
  const navigateToEmergency = () => {
    router.push('/emergency');
  };

  // Function to open call logs
  const openCallLogs = async () => {
    try {
      const supported = await Linking.canOpenURL('tel:');
      
      if (supported) {
        await Linking.openURL('tel:');
      } else {
        Alert.alert('Error', 'Cannot open call logs on this device');
      }
    } catch (error) {
      console.error('Error opening call logs:', error);
      Alert.alert('Error', 'Failed to open call logs');
    }
  };

  // Function to open messages app
  const openMessages = async () => {
    try {
      const supported = await Linking.canOpenURL('sms:');
      
      if (supported) {
        await Linking.openURL('sms:');
      } else {
        Alert.alert('Error', 'Cannot open messages on this device');
      }
    } catch (error) {
      console.error('Error opening messages:', error);
      Alert.alert('Error', 'Failed to open messages');
    }
  };

  // Alternative approach for more specific functionality
  const openCallLogsAlternative = async () => {
    try {
      await Linking.openURL('tel:');
    } catch (error) {
      console.error('Error opening call logs:', error);
      try {
        await Linking.openURL('tel:');
      } catch (fallbackError) {
        Alert.alert('Error', 'Cannot open phone app');
      }
    }
  };

  const openMessagesAlternative = async () => {
    try {
      await Linking.openURL('sms:');
    } catch (error) {
      console.error('Error opening messages:', error);
      try {
        await Linking.openURL('sms:?body=');
      } catch (fallbackError) {
        Alert.alert('Error', 'Cannot open messages app');
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished - navigate to index page
      setIsActive(false);
      navigateToIndex();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Format time for display
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  // Calculate progress percentage
  const progress = ((totalMinutes * 60 - timeLeft) / (totalMinutes * 60)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateTimeContainer}>
          <Text>{new Date().toLocaleDateString()}</Text>
          <Text>{new Date().toLocaleTimeString()}</Text>
        </View>
        <TouchableOpacity style={styles.emergencyButton} onPress={navigateToEmergency}>
          <Image 
            source={require('../assets/images/emergency.png')}
            style={styles.emergencyImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Lockdown</Text>
        
        {/* Countdown Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {hours}:{minutes}:{seconds}
          </Text>
          <Text style={styles.timerLabel}>
            Time Remaining
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.initialTime}>
            Initial time: {initialHours}h {initialMinutes}m
          </Text>
        </View>

        {/* Buttons side by side */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={openCallLogs}>
            <Image 
              source={require('../assets/images/call.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openMessages}>
            <Image 
              source={require('../assets/images/messages.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  dateTimeContainer: {
    alignItems: 'flex-start',
  },
  emergencyButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
  },
  emergencyImage: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    width: '100%',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '100%',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  initialTime: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});