// app/emergency-page.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Application from 'expo-application';

export default function EmergencyPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [shouldCloseApp, setShouldCloseApp] = useState(false);

  const checkPassword = (inputPassword: string) => {
    return inputPassword === '1234';
  };

  const closeApp = () => {
    console.log('Attempting to close app...');
    
    // Method 1: BackHandler.exitApp() - most reliable for React Native
    try {
      BackHandler.exitApp();
    } catch (error) {
      console.log('BackHandler.exitApp failed:', error);
      
      // Method 2: Expo Application.exitApp()
      try {
        if (Application.exitApp) {
          Application.exitApp();
        } else {
          throw new Error('Application.exitApp not available');
        }
      } catch (error2) {
        console.log('Application.exitApp failed:', error2);
        
        // Method 3: Show manual close instructions
        Alert.alert(
          'Emergency Access Granted',
          'Please manually close the app from your recent apps.',
          [
            { 
              text: 'OK', 
              onPress: () => {
                // This is a fallback - app might not close programmatically
                console.log('User acknowledged manual close');
              }
            }
          ]
        );
      }
    }
  };

  const showCustomAlertMessage = (message: string, type: 'success' | 'error', closeAppAfterAlert = false) => {
    setAlertMessage(message);
    setAlertType(type);
    setShouldCloseApp(closeAppAfterAlert);
    setShowCustomAlert(true);
  };

  const handleUnlock = () => {
    if (!password.trim()) {
      showCustomAlertMessage('Please enter a password', 'error');
      return;
    }

    if (checkPassword(password)) {
      showCustomAlertMessage('Emergency access granted. Closing the app...', 'success', true);
    } else {
      showCustomAlertMessage('Emergency access denied.', 'error');
    }
  };

  const handleAlertConfirm = () => {
    setShowCustomAlert(false);
    
    if (shouldCloseApp) {
      // Add a small delay to ensure the alert is fully dismissed
      setTimeout(() => {
        closeApp();
      }, 100);
    } else {
      router.back();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Access</Text>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter emergency password to unlock and close the app immediately.
        </Text>
        
        <TextInput 
          style={styles.input}
          secureTextEntry
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          autoFocus
          onSubmitEditing={handleUnlock}
        />
        
        {/* Custom Alert positioned below TextInput */}
        {showCustomAlert && (
          <View style={[
            styles.customAlert,
            alertType === 'success' ? styles.successAlert : styles.errorAlert
          ]}>
            <Text style={styles.alertText}>{alertMessage}</Text>
            <TouchableOpacity 
              style={styles.alertButton} 
              onPress={handleAlertConfirm}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
            <Text style={styles.unlockButtonText}>Unlock & Close</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.note}>
          Note: This is for emergency use only. Correct password will close the entire app.
        </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#e74c3c',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  input: {
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f8f9fa',
  },
  // Custom Alert Styles
  customAlert: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successAlert: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  errorAlert: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  alertText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#155724',
  },
  alertButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 20,
    gap: 15,
  },
  unlockButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  unlockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    lineHeight: 16,
  },
});