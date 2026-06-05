const mongoose = require('mongoose');
const Team = require('../models/Team');
const Tournament = require('../models/Tournament');
const Match = require('../models/Match');

const mongoURI = 'mongodb://localhost:27017/khazina-sports';

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    console.log('🧹 Clearing existing teams, tournaments, and matches...');
    await Team.deleteMany({});
    await Tournament.deleteMany({});
    await Match.deleteMany({});
    console.log('✅ Collections cleared.');

    // Seed Teams
    console.log('🌱 Seeding teams...');
    const teamsData = [
      {
        name: 'Khazina Kings',
        village: 'Khazina',
        captain: 'Nadeem Khan',
        viceCaptain: 'Yasir Shah',
        phone: '03001234567',
        email: 'kings@khazinasports.com',
        players: [
          { name: 'Nadeem Khan', role: 'allrounder' },
          { name: 'Yasir Shah', role: 'bowler' },
          { name: 'Rizwan Ahmed', role: 'wicketkeeper' },
          { name: 'Kamran Akmal', role: 'batsman' }
        ]
      },
      {
        name: 'Peshawar Zalmi',
        village: 'Peshawar',
        captain: 'Babar Azam',
        viceCaptain: 'Saim Ayub',
        phone: '03007654321',
        email: 'zalmi@peshawar.com',
        players: [
          { name: 'Babar Azam', role: 'batsman' },
          { name: 'Saim Ayub', role: 'batsman' },
          { name: 'Aamer Jamal', role: 'allrounder' }
        ]
      },
      {
        name: 'Mardan Warriors',
        village: 'Mardan',
        captain: 'Fakhar Zaman',
        viceCaptain: 'Ali Khan',
        phone: '03123456789',
        email: 'warriors@mardan.com',
        players: [
          { name: 'Fakhar Zaman', role: 'batsman' },
          { name: 'Ali Khan', role: 'bowler' }
        ]
      },
      {
        name: 'Khyber Hawks',
        village: 'Khyber Pass',
        captain: 'Shaheen Afridi',
        viceCaptain: 'Haris Rauf',
        phone: '03219876543',
        email: 'hawks@khyber.com',
        players: [
          { name: 'Shaheen Afridi', role: 'bowler' },
          { name: 'Haris Rauf', role: 'bowler' }
        ]
      }
    ];

    const seededTeams = await Team.insertMany(teamsData);
    console.log(`✅ Seeded ${seededTeams.length} teams.`);

    // Seed Tournaments
    console.log('🌱 Seeding tournaments...');
    const teamIds = seededTeams.map(t => t._id);
    const tournamentsData = [
      {
        name: 'Khazina Premier League 2026',
        format: 'league',
        matchType: 't20',
        startDate: new Date('2026-06-01'),
        endDate: new Date('2026-06-30'),
        venue: 'Khazina Sports Stadium',
        prizeMoney: 100000,
        status: 'live',
        teams: [teamIds[0], teamIds[1], teamIds[2]]
      },
      {
        name: 'Khyber Champions Cup',
        format: 'knockout',
        matchType: 'tapeball',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-15'),
        venue: 'Khyber Ground',
        prizeMoney: 50000,
        status: 'upcoming',
        teams: [teamIds[1], teamIds[2], teamIds[3]]
      }
    ];

    const seededTournaments = await Tournament.insertMany(tournamentsData);
    console.log(`✅ Seeded ${seededTournaments.length} tournaments.`);

    // Seed Matches
    console.log('🌱 Seeding matches...');
    const matchesData = [
      {
        tournament: seededTournaments[0]._id,
        teamA: teamIds[0],
        teamB: teamIds[1],
        date: new Date('2026-06-05'),
        time: '18:00',
        venue: 'Khazina Sports Stadium',
        matchType: 't20',
        status: 'live',
        toss: {
          winner: teamIds[0],
          choice: 'bat'
        }
      },
      {
        tournament: seededTournaments[0]._id,
        teamA: teamIds[1],
        teamB: teamIds[2],
        date: new Date('2026-06-08'),
        time: '20:00',
        venue: 'Khazina Sports Stadium',
        matchType: 't20',
        status: 'scheduled'
      },
      {
        tournament: seededTournaments[1]._id,
        teamA: teamIds[2],
        teamB: teamIds[3],
        date: new Date('2026-07-02'),
        time: '16:00',
        venue: 'Khyber Ground',
        matchType: 'tapeball',
        status: 'scheduled'
      }
    ];

    const seededMatches = await Match.insertMany(matchesData);
    console.log(`✅ Seeded ${seededMatches.length} matches.`);

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
