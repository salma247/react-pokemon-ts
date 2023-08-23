import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, RootState } from "../redux/store";
import { fetchPokemon } from "../redux/thunks";
import { useSelector } from "react-redux";

function PokemonDetails() {
  // Get the pokemon name from the URL Last part
  const pokemonName = useParams<{ pokemon: string }>().pokemon;

  const dispatch = useAppDispatch();
  const { pokemon, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemon(pokemonName as string));
  }, [dispatch, pokemonName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: "16px auto" }}>
      <CardHeader title={pokemon?.name} />
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
