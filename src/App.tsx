import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";
import Pokemons from "./pages/Pokemons";
import PokemonsFav from "./pages/PokemonsFav";
import Provider from "./lib/react-query/Provider";

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
        <Route path="/pokemons-fav" element={<PokemonsFav />} />
      </Routes>
    </Provider>
  );
}

export default App;
