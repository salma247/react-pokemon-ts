import { Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useQueries } from "react-query";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as GridList } from "react-window";
import Card from "../components/Card";
import { fetchPokemon } from "../lib/pokemonFetching";
import { useFavoritesStore } from "../state/store";



function PokemonsFav() {
  const [columns, setColumns] = useState(1);
  const favoritesStore = useFavoritesStore();

  const favorites = favoritesStore.favorites;

  const queries = useQueries(
    favorites.map((pokemonName) => ({
      queryKey: ["pokemon", pokemonName],
      queryFn: () => fetchPokemon(pokemonName),
    }))
  );

  const data = queries.map((q) => q.data);

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
    const pokemon = data?.[index];

    if (!pokemon) return null;

    return <Card key={pokemon.name} pokemon={pokemon} style={style} />;
  };

  return (
    <div style={{ backgroundColor: "#f8f8f8", height: "100vh", padding: 16 }}>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        fontSize={32}
        gutterBottom
      >
        Pokemons
      </Typography>

      <AutoSizer style={{ width: "100%", height: "100vh" }}>
        {({ height, width }: { height: number; width: number }) => {
          const totalItems = data?.length || 0; // Use optional chaining and provide a default value

          return (
            <GridList
              height={height}
              width={width}
              columnCount={columns}
              columnWidth={width / columns}
              rowCount={Math.ceil(totalItems / columns)}
              rowHeight={100}
            >
              {renderItem}
            </GridList>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default PokemonsFav;
