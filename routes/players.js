const express = require('express');
const router = express.Router();

// Sample data - replace this with actual database operations
let players = [];

// GET all players
router.get('/', (req, res) => {
  res.json(players);
});

// GET a single player by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const player = players.find(player => player.id === id);
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// CREATE a new player
router.post('/', (req, res) => {
  const { name, teamId } = req.body;
  const id = players.length + 1;
  const newPlayer = { id, name, teamId };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

// UPDATE an existing player by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, teamId } = req.body;
  const playerIndex = players.findIndex(player => player.id === id);
  if (playerIndex !== -1) {
    players[playerIndex] = { id, name, teamId };
    res.json(players[playerIndex]);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// DELETE a player by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const playerIndex = players.findIndex(player => player.id === id);
  if (playerIndex !== -1) {
    players.splice(playerIndex, 1);
    res.json({ message: 'Player deleted successfully' });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

module.exports = router;
