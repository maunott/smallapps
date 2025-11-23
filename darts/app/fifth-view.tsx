import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext, Competition } from '../src/context/AppContext';

const FifthView: React.FC = () => {
  const { competitionId } = useLocalSearchParams(); // Haetaan kilpailun ID
  const { competitions, calculateTotalScores } = useAppContext(); // Haetaan kilpailut ja pisteiden laskenta AppContextista
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    if (!competitionId) {
      console.log('competitionId puuttuu.');
      Alert.alert('Virhe', 'Kilpailun ID puuttuu!');
      router.push('/'); // Palataan etusivulle
      return;
    }

    const foundCompetition = competitions.find((comp) => comp.id === competitionId);
    if (foundCompetition) {
      setCompetition(foundCompetition);
    } else {
      console.log(`Kilpailua ei löytynyt competitionId: ${competitionId}`);
      Alert.alert('Virhe', 'Kilpailua ei löytynyt!');
      router.push('/'); // Palataan etusivulle, jos kilpailua ei löydy
    }
  }, [competitionId, competitions, router]);

  if (!competition) {
    return null; // Näytetään tyhjä näkymä, kunnes kilpailu on ladattu
  }

  const totalScores = calculateTotalScores(competition.id); // Lasketaan pelaajien pisteet
  const sortedScores = totalScores
    ? [...totalScores].sort((a, b) => b.total - a.total) // Järjestetään pisteiden mukaan
    : [];

  const highestScore = sortedScores.length > 0 ? sortedScores[0].total : 0;
  const winners = sortedScores.filter((player) => player.total === highestScore);

  return (
    <View style={styles.container}>
      {winners.length === 1 ? (
        <Text style={styles.title}>
          Kilpailun voitti: <Text style={styles.winner}>{winners[0].player}</Text>
        </Text>
      ) : (
        <Text style={styles.title}>
          Peli päättyi tasapeliin:{" "}
          {winners.map((winner, index) => (
            <Text key={winner.player} style={styles.winner}>
              {winner.player}
              {index < winners.length - 1 ? ", " : ""}
            </Text>
          ))}
        </Text>
      )}
      <FlatList
        data={sortedScores}
        keyExtractor={(item) => item.player}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item.player}</Text>
            <Text style={styles.playerScore}>{item.total} pistettä</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={[styles.playerName, styles.headerText]}>Pelaaja</Text>
            <Text style={[styles.playerScore, styles.headerText]}>Pisteet</Text>
          </View>
        )}
      />
      <Button
        title="Palaa etusivulle"
        onPress={() => router.push('/')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  winner: { fontSize: 20, fontWeight: 'bold', color: 'green' },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  playerName: { fontSize: 18 },
  playerScore: { fontSize: 18, fontWeight: 'bold' },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: { fontWeight: 'bold', fontSize: 18 },
});

export default FifthView;