// app/_layout.tsx
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
 
      <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Tech Detox',
          headerShown: false // Hide header for StartPage
        }} 
      />
      <Stack.Screen 
        name="mainPage" 
        options={{ 
          title: 'Main Page',
          headerShown: false // Hide header for MainPage
        }} 
      />
      <Stack.Screen 
        name="emergency" 
        options={{ 
          title: 'Emergency',
          headerShown: false // Hide header for Emergency
        }} 
      />
    </Stack>

    
  );
}