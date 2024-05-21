const express = require('express');
const router = express.Router();

// Sample data - replace this with actual database operations
let teams = [];

// GET all teams
router.get('/', (req, res) => {
  res.json(teams);
});

// GET a single team by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const team = teams.find(team => team.id === id);
  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

// CREATE a new team
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const id = teams.length + 1;
  const newTeam = { id, name, description };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// UPDATE an existing team by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const teamIndex = teams.findIndex(team => team.id === id);
  if (teamIndex !== -1) {
    teams[teamIndex] = { id, name, description };
    res.json(teams[teamIndex]);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

// DELETE a team by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const teamIndex = teams.findIndex(team => team.id === id);
  if (teamIndex !== -1) {
    teams.splice(teamIndex, 1);
    res.json({ message: 'Team deleted successfully' });
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

module.exports = router;
