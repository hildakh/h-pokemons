import React, { useEffect, useState } from 'react';

interface Props {
  name: string;
  url: string;
}

export const PokemonItem = ({
  name,
  url,
}: Props) => {
  const [newName, setNewName ] = useState(name);
  const [note, setNote] = useState('');
  const [captured, setCaptured] = useState(false);

  const handleNameChange = (event: any) => {
    setNewName(event.target.value)
  }

  const handleNoteChange = (event: any) => {
    setNote(event.target.value)
  }

  const capture = async () => {
    const apiUrl = process.env.REACT_APP_API_URL!;

    const pokemonToCapture = {
      name: newName,
      url,
      note,
    };

    const response = await fetch(`${apiUrl}/pokemon`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemonToCapture)
    })

    try {
      const data = response.json();
      console.log('data after capture');
      setCaptured(true);
      return data;
    } catch(error) {
      console.log('error', error);
    }
  }

  return (
    <div className="item">
      <p>
        {name}
      </p>

      <input
        type="text"
        onChange={handleNameChange}
        name="new name"
        aria-label="new name for this Pokemon"
        placeholder="Name"
      />
      <input
        type="text"
        onChange={handleNoteChange}
        name="note"
        aria-label="Note for this capture"
        placeholder="Capture note"
      />

      <button onClick={capture}>
        Capture {name}
      </button>
      {
        captured && (
        <p>
          Yaaay you captures {name}
        </p>
        )
      }
    </div>
  )
};
