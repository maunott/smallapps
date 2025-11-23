import { Stack } from 'expo-router';
import { AppProvider } from '../src/context/AppContext'; // Tuodaan AppProvider

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: 'Tikkasovellus 1/5', // Otsikko ja vaihe
            headerTitleAlign: 'center', // Keskitetään otsikko
            headerLeft: () => null, // Piilotetaan takaisin-nuoli
          }}
        />
        <Stack.Screen
          name="second-view"
          options={{
            headerTitle: 'Lisää pelaajat 2/5', // Otsikko ja vaihe
            headerTitleAlign: 'center', // Keskitetään otsikko
            headerLeft: () => null, // Piilotetaan takaisin-nuoli
          }}
        />
        <Stack.Screen
          name="third-view"
          options={{
            headerTitle: 'Valitse kierrokset 3/5', // Otsikko ja vaihe
            headerTitleAlign: 'center', // Keskitetään otsikko
            headerLeft: () => null, // Piilotetaan takaisin-nuoli
          }}
        />
        <Stack.Screen
          name="fourth-view"
          options={{
            headerTitle: 'Syötä pisteet 4/5', // Otsikko ja vaihe
            headerTitleAlign: 'center', // Keskitetään otsikko
            headerLeft: () => null, // Piilotetaan takaisin-nuoli
          }}
        />
        <Stack.Screen
          name="fifth-view"
          options={{
            headerTitle: 'Lopputulokset 5/5', // Otsikko ja vaihe
            headerTitleAlign: 'center', // Keskitetään otsikko
            headerLeft: () => null, // Piilotetaan takaisin-nuoli
          }}
        />
      </Stack>
    </AppProvider>
  );
}