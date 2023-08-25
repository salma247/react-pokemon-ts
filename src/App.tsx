import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";
import Pokemons from "./pages/Pokemons";
import PokemonsFav from "./pages/PokemonsFav";
import QueryProvider from "./lib/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
        <Route path="/pokemons-fav" element={<PokemonsFav />} />
      </Routes>
    </QueryProvider>
  );
}

export default App;
