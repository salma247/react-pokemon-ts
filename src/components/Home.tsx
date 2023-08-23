import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";
import { fetchPokemons } from "../redux/thunks";
import { Typography } from "@mui/material";
import { FixedSizeGrid as GridList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Card from "./Card";

function Home() {
  const [columns, setColumns] = useState(4);
  const dispatch = useAppDispatch();
  const { pokemons, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

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
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderItem = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columns + columnIndex;
    const pokemon = pokemons[index];

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

      {loading && (
        <Typography variant="h2" component="h2" align="center">
          Loading...
        </Typography>
      )}

      {error && (
        <Typography variant="h2" component="h2" align="center">
          {error}
        </Typography>
      )}

      <AutoSizer style={{ width: "100%", height: "100vh" }}>
        {({ height, width }: { height: number; width: number }) => (
          <GridList
            height={height}
            width={width}
            columnCount={columns}
            columnWidth={width / columns}
            rowCount={Math.ceil(pokemons.length / columns)}
            rowHeight={100}
          >
            {renderItem}
          </GridList>
        )}
      </AutoSizer>
    </div>
  );
}

export default Home;
