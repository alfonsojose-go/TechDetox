import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function StartButton({ onPress }: { onPress: () => void }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const handleStartPress = () => {
    setShowConfirmation(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleConfirm = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmation(false);
      onPress();
    });
  };

  const handleCancel = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmation(false);
    });
  };

  const slideDown = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // Slides down from top
  });

  const fadeIn = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      {!showConfirmation ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      ) : null}
      
      {showConfirmation && (
        <Animated.View 
          style={[
            styles.confirmationContainer,
            {
              transform: [{ translateY: slideDown }],
              opacity: fadeIn,
            }
          ]}
        >
          <Text style={styles.confirmationTitle}>Are you sure?</Text>
          <Text style={styles.confirmationText}>
            This will start your tech detox session.
          </Text>
          
          <View style={styles.confirmationButtons}>
            <TouchableOpacity 
              style={[styles.confirmButton, styles.noButton]} 
              onPress={handleCancel}
            >
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.confirmButton, styles.yesButton]} 
              onPress={handleConfirm}
            >
              <Text style={styles.yesButtonText}>Yes, Start</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  yesButton: {
    backgroundColor: '#007AFF',
  },
  noButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  yesButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});