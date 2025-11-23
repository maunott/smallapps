import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

const FourthView: React.FC = () => {
  const { competitionId } = useLocalSearchParams(); // Haetaan kilpailun ID
  const { competitions, addScore, nextRound, calculateTotalScores } = useAppContext(); // Haetaan AppContextin funktiot
  const competition = competitions.find((comp) => comp.id === competitionId); // Haetaan kilpailu ID:n perusteella
  const [scores, setScores] = useState<{ [player: string]: string }>({}); // Pelaajien pisteet (väliaikainen tila)
  const router = useRouter();

  if (!competition) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Kilpailua ei löytynyt!</Text>
      </View>
    );
  }

  const handleScoreChange = (player: string, score: string) => {
    const numericScore = parseInt(score, 10);
    if (!isNaN(numericScore) && numericScore >= 0 && numericScore <= 50) {
      setScores((prevScores) => ({
        ...prevScores,
        [player]: score,
      }));
    } else {
      alert('Syötä pisteet väliltä 0–50.');
    }
  };

  const handleSaveScores = () => {
    Object.entries(scores).forEach(([player, score]) => {
      const numericScore = parseInt(score, 10);
      if (!isNaN(numericScore)) {
        addScore(competition.id, player, numericScore); // Tallennetaan pisteet AppContextiin
      }
    });
    setScores({}); // Tyhjennetään väliaikainen tila

    if (competition.currentRound < competition.rounds) {
      nextRound(competition.id); // Siirrytään seuraavaan kierrokseen
    } else {
      router.push({
        pathname: '/fifth-view',
        params: { competitionId: competition.id }, // Siirrytään lopputulosnäkymään
      });
    }
  };

  const totalScores = calculateTotalScores(competition.id); // Lasketaan kumulatiiviset pisteet

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Kierros {competition.currentRound}/{competition.rounds}
      </Text>
      <FlatList
        data={competition.players}
        keyExtractor={(item) => item}
        renderItem={({ item: player }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{player}</Text>
            <TextInput
              style={styles.input}
              placeholder="Pisteet"
              keyboardType="numeric"
              value={scores[player] || ''}
              onChangeText={(value) => handleScoreChange(player, value)}
            />
            <Text style={styles.totalScore}>
              Yhteensä: {totalScores?.find((score) => score.player === player)?.total || 0}
            </Text>
          </View>
        )}
      />
      <Button
        title={
          competition.currentRound < competition.rounds
            ? 'Tallenna pisteet ja siirry seuraavaan kierrokseen'
            : 'Näytä lopputulokset'
        }
        onPress={handleSaveScores}
        disabled={Object.keys(scores).length !== competition.players.length} // Nappi aktivoituu vain, kun kaikille pelaajille on syötetty pisteet
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  error: { fontSize: 18, color: 'red', textAlign: 'center' },
  playerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  playerName: { flex: 1, fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  totalScore: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FourthView;