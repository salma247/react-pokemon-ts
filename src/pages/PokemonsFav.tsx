import { Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useQueries } from "react-query";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";
import { fetchPokemon } from "../lib/axios/api";
import { useFavoritesStore, useSearchStore } from "../state/store";
import PokemonsList from "../components/PokemonsList";

function PokemonsFav() {
  const [columns, setColumns] = useState(() =>
    Math.floor(window.innerWidth / 350)
  );

  const favoritesStore = useFavoritesStore();
  const searchStore = useSearchStore();
  const favorites = favoritesStore.favorites;

  const queries = useQueries(
    favorites.map((pokemon) => ({
      queryKey: ["pokemon", pokemon],
      queryFn: () => fetchPokemon(pokemon),
    }))
  );
  const isLoading = queries.some((q) => q.isLoading);

  const data = queries.map((q) => q.data);

  const dataFiltered = data?.filter((pokemon) =>
    pokemon?.name.includes(searchStore.search)
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setColumns(1);
      } else if (window.innerWidth < 960) {
        setColumns(2);
      } else if (window.innerWidth < 1280) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderItem = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columns + columnIndex;
    const pokemon = dataFiltered?.[index];

    //if loading, show skeleton
    if (isLoading) {
      return <SkeletonCard style={style} />;
    }

    if (!pokemon) return null;

    return <Card key={pokemon.name} pokemon={pokemon} style={style} />;
  };

  return (
    <div style={{ backgroundColor: "#f8f8f8", height: "100vh", padding: 16 }}>
      <Navbar />
      <Typography
        variant="h1"
        component="h1"
        align="center"
        fontSize={32}
        gutterBottom
      >
        Favorite Pokemons
      </Typography>

      {(favorites.length === 0 || dataFiltered?.length === 0) && (
        <Typography variant="h2" component="h2" align="center">
          No favorites
        </Typography>
      )}

      <PokemonsList
        renderItem={renderItem}
        data={dataFiltered}
        columns={columns}
        size={favorites.length}
      />
    </div>
  );
}

export default PokemonsFav;
