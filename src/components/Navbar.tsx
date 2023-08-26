import { Link } from 'react-router-dom'
import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
}
from '@mui/material'
import Searchbar from './Searchbar'

function Navbar() {
  return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pokemon
            </Typography>
            <Searchbar />
            <Button color="inherit" component={Link} to="/">Pokemons</Button>
            <Button color="inherit" component={Link} to="/pokemons-fav">Favorites</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar