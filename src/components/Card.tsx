import {
  Card as MuiCard,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";

import pokemonImage from "../images/pokemon.png";
import { Link } from "react-router-dom";

type Props = {
    pokemon: {
        name: string;
    }
    style: any;
}

function Card({ pokemon, style }: Props) {
  return (
    <MuiCard style={style}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={pokemonImage}
            title="Pokemon"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5" component="h2">
                {pokemon.name}
            </Typography>

            <Typography variant="body2">
              <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: '#223e4d' }}>
                Learn More
              </Link>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </MuiCard>
  );
}

export default Card;
