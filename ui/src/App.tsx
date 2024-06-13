import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserDashboard } from './components/user-dashboard';
import { PokemonList } from './components/pokemon-list';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pokemon' element={<PokemonList />} />
        <Route path='/' element={<UserDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;


// 1. On the front-end, create a `/pokemon` route. This will list all Pokemon on a page.
// 2. Next to each Pokemon, there should be a *Capture* button with form fields for a *name* and *note.* When a user clicks *Capture* it should send a POST request to a `/capture` endpoint on a server.
