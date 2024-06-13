import React, { useState } from 'react';

export const UserDashboard = () => {
  const [ data, setData ] = useState();

  const apiUrl = process.env.REACT_APP_API_URL!;

  const getMain = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }

  const getAllPokemons = () => {
    fetch(`${apiUrl}/all-pokemons`)
      .then(res => {
        console.log('res from react', res);
        res.json();
      })
  }

  const psyduck = {
    id: 4,
    name: 'Psyduck',
    type: 'Water',
  };

  const addPsyduck = async () => {
    const response = await fetch(`${apiUrl}/pokemon`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(psyduck)
    })

    if (!response.ok) throw new Error();

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  return (
    <div>
      UserDashboard
      <button onClick={getMain}>
        Get initial data
      </button>
      {
        data && (
          <p>
            {data}
          </p>
        )
      }
      <button onClick={addPsyduck}>
        Add Psyduck
      </button>

      <button onClick={getAllPokemons}>
        Get all
      </button>
    </div>
  )
};
