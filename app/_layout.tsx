import '../global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home Screen' }} />
        <Stack.Screen name="details" options={{ title: 'Details Screen' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Notfound Screen' }} />
        <Stack.Screen name="signup" options={{ title: 'Signup Page' }} />
        <Stack.Screen name="(protected)" options={{ title: 'Protected Page' }} />
      </Stack>
    </>
  );
}
