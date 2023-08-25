import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";
import Pokemons from "./pages/Pokemons";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
