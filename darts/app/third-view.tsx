import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

const ThirdView: React.FC = () => {
  const { competitionId } = useLocalSearchParams();
  const { competitions, setCompetitions } = useAppContext();
  const router = useRouter();
  const [selectedRounds, setSelectedRounds] = useState<number | null>(null);

  const handleStartGame = () => {
    if (!competitionId) {
      Alert.alert('Virhe', 'Kilpailun ID puuttuu!');
      router.push('/');
      return;
    }

    const competition = competitions.find((comp) => comp.id === competitionId);
    if (!competition) {
      Alert.alert('Virhe', 'Kilpailua ei löytynyt!');
      router.push('/');
      return;
    }

    if (selectedRounds === null) {
      Alert.alert('Virhe', 'Valitse kierrosten määrä ennen jatkamista.');
      return;
    }

    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((comp) =>
        comp.id === competitionId ? { ...comp, rounds: selectedRounds } : comp
      )
    );

    Alert.alert('Kierrokset asetettu', `Kierrosten määrä: ${selectedRounds}`);
    router.push({
      pathname: '/fourth-view',
      params: { competitionId }, // Siirrytään pisteiden laskemiseen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valitse kierrosten määrä</Text>
      <View style={styles.radioGroup}>
        {[...Array(10)].map((_, index) => {
          const round = index + 1;
          return (
            <TouchableOpacity
              key={round}
              style={[
                styles.radioButton,
                selectedRounds === round && styles.radioButtonSelected,
              ]}
              onPress={() => setSelectedRounds(round)}
            >
              <Text style={styles.radioText}>{round} kierrosta</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button title="Aloita kilpailu" onPress={handleStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  radioGroup: {
    marginBottom: 16,
  },
  radioButton: {
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  radioButtonSelected: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  radioText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ThirdView;