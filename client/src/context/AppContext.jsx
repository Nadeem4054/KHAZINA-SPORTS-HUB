import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teams');
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  };

  const fetchTournaments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tournaments');
      setTournaments(res.data);
    } catch (error) {
      console.error("Error fetching tournaments", error);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/matches');
      setMatches(res.data);
    } catch (error) {
      console.error("Error fetching matches", error);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchTournaments();
    fetchMatches();
  }, []);

  return (
    <AppContext.Provider value={{
      teams, setTeams, fetchTeams,
      tournaments, setTournaments, fetchTournaments,
      matches, setMatches, fetchMatches,
      loading, setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};
