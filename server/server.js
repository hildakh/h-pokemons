import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

import { globalData } from './global-data.js';

const app = express();
const db = globalData;

app.use(cors());

app.use(express.json());

const PORT = 8000;

const getAllPokemon = async () => {
  const allPokemon = [];

  // fetch the 1st 100
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const response = await fetch(url);
  const data = await response.json();
  allPokemon.push(...data.results);

  return allPokemon;
};

app.listen(PORT, () => {
  console.log(`Here here listening on port ${PORT}`);
})


app.get('/all-pokemons', async (_, res) => {
  console.log('call here');

  try {
    const pokemonList = await getAllPokemon();

    res.status(200).json({data: pokemonList});

  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ message: 'Error fetching Pokémon', error: error.message });
  }
});

app.post('/pokemon', (req, res) =>{
  const pokemon = req.body;

  db.pokemons.push({
    ...pokemon,
    id: 100
  });

  db.userPokemons.push({
    ...pokemon,
    userId: 1,
    pokemonId: 100
  })

  res.status(200).json({ data: pokemon });
})
