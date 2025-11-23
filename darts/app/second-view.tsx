import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

const SecondView: React.FC = () => {
  const { competitionId } = useLocalSearchParams();
  const { competitions, setCompetitions } = useAppContext();
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      Alert.alert('Virhe', 'Pelaajan nimi ei voi olla tyhjä.');
      return;
    }
    setPlayers((prevPlayers) => [...prevPlayers, playerName.trim()]);
    setPlayerName('');
  };

  const handleSavePlayers = () => {
    if (players.length < 2) {
      Alert.alert('Virhe', 'Kilpailuun täytyy lisätä vähintään kaksi pelaajaa.');
      return;
    }

    const competition = competitions.find((comp) => comp.id === competitionId);
    if (!competition) {
      Alert.alert('Virhe', 'Kilpailua ei löytynyt!');
      router.push('/');
      return;
    }

    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((comp) =>
        comp.id === competitionId ? { ...comp, players } : comp
      )
    );

    Alert.alert('Pelaajat tallennettu', 'Pelaajat on lisätty kilpailuun.');
    router.push({
      pathname: '/third-view',
      params: { competitionId }, // Siirrytään kierrosten määrän asettamiseen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lisää pelaajia</Text>
      <TextInput
        style={styles.input}
        placeholder="Pelaajan nimi"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <Button title="Lisää pelaaja" onPress={handleAddPlayer} />
      <FlatList
        data={players}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text style={styles.player}>{item}</Text>}
      />
      <Button
        title="Aloita kilpailu"
        onPress={handleSavePlayers}
        disabled={players.length < 2} // Painike on aktiivinen vain, jos pelaajia on vähintään kaksi
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  player: { fontSize: 18, marginBottom: 8 },
});

export default SecondView;