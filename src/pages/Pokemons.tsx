import { Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";
import { fetchPokemons } from "../lib/axios/api";
import { useSearchStore } from "../state/store";
import PokemonsList from "../components/PokemonsList";

function Pokemons() {
  const limit = 1000;
  const [columns, setColumns] = useState(() =>
    Math.floor(window.innerWidth / 350)
  );
  const searchStore = useSearchStore();

  const { data, isLoading, error } = useQuery<TPokemons[], Error>(
    "pokemons",
    () => fetchPokemons(limit)
  );

  const dataFiltered = data?.filter((pokemon) =>
    pokemon.name.includes(searchStore.search)
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

    if (!pokemon) return null;

    return <Card key={pokemon.name} pokemon={pokemon} style={style} />;
  };

  const renderItemSkeleton = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columns + columnIndex;
    return <SkeletonCard key={index} style={style} />;
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
        Pokemons
      </Typography>

      {error && (
        <Typography variant="h2" component="h2" align="center">
          Error
        </Typography>
      )}

      {dataFiltered?.length === 0 && (
        <Typography variant="h2" component="h2" align="center">
          No results
        </Typography>
      )}

      {isLoading && (
        <PokemonsList renderItem={renderItemSkeleton} data={dataFiltered} columns={columns} size={limit} />
      )}


      {!isLoading && (
        <PokemonsList renderItem={renderItem} data={dataFiltered} columns={columns} size={limit} />
      )}
      
    </div>
  );
}

export default Pokemons;
