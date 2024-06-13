import React, { useEffect, useState } from 'react';
import './styles.scss';
import { PokemonItem } from './pokemon-item';

interface PokemonType {
  name: string;
  url: string;
}
export const PokemonList = () => {
  const [ pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL!;
    const fetchPokemons = () => fetch(`${apiUrl}/all-pokemons`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setPokemons(data.data);
      });

    fetchPokemons();
  }, [])

  return (
    <div>
      {
        loading ? (
          <p>Loading...</p>
        )
        :
        (
          <ul>
          {
            pokemons.length && pokemons.map((pokemon: PokemonType) => {
              return (
              <li key={pokemon.name}>
                <PokemonItem name={pokemon.name} url={pokemon.url}/>
              </li>
              )
            })
          }
          </ul>
        )
      }
    </div>
  )
};
