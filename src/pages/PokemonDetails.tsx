import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchPokemon } from "../lib/axios/api";
import { useFavoritesStore } from "../state/store";

function PokemonDetails() {
  const pokemonName = useParams<{ pokemon: string }>().pokemon;
  const favoritesStore = useFavoritesStore();

  const {
    data: pokemon,
    status,
    error,
  } = useQuery<TPokemon, Error>(["pokemon", pokemonName], () =>
    fetchPokemon(pokemonName as string)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: "16px auto" }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2">
            {pokemon?.name}
          </Typography>
        }
        action={
          favoritesStore.favorites.includes(pokemon?.name as string) ? (
            <Favorite
              color="error"
              onClick={() => favoritesStore.toggle(pokemon?.name as string)}
            />
          ) : (
            <FavoriteBorder
              color="error"
              onClick={() => favoritesStore.toggle(pokemon?.name as string)}
            />
          )
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1">
              Base Experience: {pokemon?.base_experience}
            </Typography>
            <Typography variant="body1">Height: {pokemon?.height}</Typography>
            <Typography variant="body1">Weight: {pokemon?.weight}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Abilities:</Typography>
            <List dense>
              {pokemon?.abilities?.map((ability, index): any => (
                <ListItem key={index}>
                  <ListItemText primary={ability.ability.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={pokemon?.sprites?.front_default}
              title="Pokemon"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PokemonDetails;
