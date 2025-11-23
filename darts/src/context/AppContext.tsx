import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Käytetään uniikkien id-arvojen luomiseen

export interface Competition {
  id: string;
  name: string;
  date?: string;
  players: string[];
  rounds: number;
  currentRound: number;
  scores: { [player: string]: number[] };
  isFileSaved?: boolean; // Lisätään tila tiedostojen tallennuksen seuraamiseen
}

interface AppContextType {
  competitions: Competition[];
  setCompetitions: React.Dispatch<React.SetStateAction<Competition[]>>;
  createCompetition: (name: string, players: string[], rounds: number) => Competition;
  generateRandomName: () => string;
  addScore: (competitionId: string, player: string, score: number) => void;
  nextRound: (competitionId: string) => void;
  calculateTotalScores: (competitionId: string) => { player: string; total: number }[] | null;
  saveCompetitionFiles: (competitionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  const generateRandomName = (): string => {
    const adjectives = ['Nopea', 'Hauska', 'Jännittävä', 'Klassinen'];
    const nouns = ['Tikkakisa', 'Turnaus', 'Haaste', 'Mittelö'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  const createCompetition = (name: string, players: string[], rounds: number): Competition => {
    const now = new Date();
    const formattedDate = now.toLocaleString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newCompetition: Competition = {
      id: uuidv4(),
      name,
      date: formattedDate,
      players,
      rounds,
      currentRound: 1,
      scores: {},
      isFileSaved: false,
    };

    setCompetitions((prevCompetitions) => [...prevCompetitions, newCompetition]);
    return newCompetition;
  };

  const addScore = (competitionId: string, player: string, score: number) => {
    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((competition) => {
        if (competition.id === competitionId) {
          const updatedScores = {
            ...competition.scores,
            [player]: [...(competition.scores[player] || []), score],
          };
          return { ...competition, scores: updatedScores };
        }
        return competition;
      })
    );
  };

  const nextRound = (competitionId: string) => {
    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((competition) => {
        if (competition.id === competitionId && competition.currentRound < competition.rounds) {
          return { ...competition, currentRound: competition.currentRound + 1 };
        }
        return competition;
      })
    );
  };

  const calculateTotalScores = (competitionId: string) => {
    const competition = competitions.find((comp) => comp.id === competitionId);
    if (!competition) return null;

    const totalScores = Object.entries(competition.scores).map(([player, scores]) => ({
      player,
      total: scores.reduce((sum, score) => sum + score, 0),
    }));

    return totalScores;
  };

  const saveCompetitionFiles = (competitionId: string) => {
    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((competition) => {
        if (competition.id === competitionId) {
          if (competition.isFileSaved) {
            console.log('Tiedostot on jo tallennettu kilpailulle:', competitionId);
            return competition; // Jos tiedostot on jo tallennettu, ei tehdä mitään
          }

          // Tiedostojen luontilogiikka
          console.log(`Tallennetaan tiedostot kilpailulle: ${competitionId}`);
          // Lisää tiedostojen tallennuslogiikka tähän
          competition.isFileSaved = true; // Merkitään tiedostot tallennetuiksi
        }
        return competition;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        competitions,
        setCompetitions,
        createCompetition,
        generateRandomName,
        addScore,
        nextRound,
        calculateTotalScores,
        saveCompetitionFiles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext täytyy käyttää AppProviderin sisällä');
  }
  return context;
};