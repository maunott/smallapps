import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../src/context/AppContext';

const HomeView: React.FC = () => {
  const { competitions, createCompetition, generateRandomName } = useAppContext();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddCompetition = async () => {
    if (isCreating) {
      console.log('Kilpailun luonti on jo käynnissä.');
      Alert.alert('Info', 'Kilpailun luonti on jo käynnissä.');
      return;
    }

    setIsCreating(true);
    console.log('Aloitetaan uuden kilpailun luonti.');

    try {
      const randomName = generateRandomName();
      console.log(`Luodaan kilpailu nimellä: ${randomName}`);

      const newCompetition = createCompetition(randomName, [], 0);
      console.log(`Kilpailu tallennettu: ${JSON.stringify(newCompetition)}`);

      Alert.alert('Info', `Kilpailu luotu: ${randomName}`);
      router.push({
        pathname: '/second-view', // Ohjataan pelaajien lisäämisnäkymään
        params: { competitionId: newCompetition.id }, // Välitetään juuri luodun kilpailun ID
      });
    } catch (error) {
      console.error('Virhe kilpailun luonnissa:', error);
      Alert.alert('Virhe', 'Kilpailun luonnissa tapahtui virhe.');
    } finally {
      setIsCreating(false);
      console.log('Kilpailun luonti valmis.');
    }
  };

  const handleViewResults = (competitionId: string) => {
    console.log(`Siirrytään kilpailun tuloksiin. Kilpailun ID: ${competitionId}`);
    router.push({
      pathname: '/fifth-view',
      params: { competitionId }, // Välitetään kilpailun ID
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aloita tästä</Text>
      <Button title="Lisää uusi kilpailu" onPress={handleAddCompetition} />
      <FlatList
        data={[...competitions].sort((a, b) => b.id.localeCompare(a.id))} // Järjestetään kilpailut ID:n mukaan
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleViewResults(item.id)} // Siirrytään kilpailun tuloksiin
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemDate: { fontSize: 14, color: '#666' },
});

export default HomeView;