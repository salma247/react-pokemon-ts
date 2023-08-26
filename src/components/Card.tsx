import {
  Card as MuiCard,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import pokemonImage from "../images/pokemon.png";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../state/store";

type Props = {
  pokemon: {
    name: string;
  };
  style: any;
};

function Card({ pokemon, style }: Props) {
  const favoritesStore = useFavoritesStore();
  return (
    <MuiCard style={style} sx={{ maxWidth: 320, paddingX: 1, maxHeight: 90 }}> 
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={pokemonImage}
            title="Pokemon"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {pokemon.name}
            </Typography>

            <Typography variant="body2">
              <Link
                to={`/pokemon/${pokemon.name}`}
                style={{ textDecoration: "none", color: "#223e4d" }}
              >
                Learn More
              </Link>
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <CardContent>
            {favoritesStore.favorites.includes(pokemon.name) ? (
              <Favorite
                color="error"
                onClick={() => favoritesStore.toggle(pokemon.name)}
              />
            ) : (
              <FavoriteBorder
                color="error"
                onClick={() => favoritesStore.toggle(pokemon.name)}
              />
            )}
          </CardContent>
        </Grid>
      </Grid>
    </MuiCard>
  );
}

export default Card;
