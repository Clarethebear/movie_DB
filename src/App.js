import { useState, useEffect} from 'react';
import AllMovies from './components/AllMovies';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import './App.css';

const App = () => {
    // create a state object to hold all movies
    const [movies, setMovies] = useState([]);

    //create a state object for the value of search (here for easier access)
    const [searchVal, setSearchVal] = useState('');

    // create a state object to hold favorites
    const [favorites, setFavourites] = useState([]);

    // create an async func to fetch the API 
   async function getMovie () {
       // set the url in a variable w/ a template string to accept input
       const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=8844700c`;

       // make a fetch request to the given API & convert it to json
       const res = await fetch (url);
       const resJson = await res.json();

       if (resJson.Search) {
        setMovies(resJson.Search)
       }
    };

   // initial call of getMovie func using the useEffect hook w/ the inputted value as parameters
   useEffect(() => {
        getMovie(searchVal);
    }, [searchVal]);

   useEffect(() => {
        const movieFavs = JSON.parse(
        localStorage.getItem('react-movie db-favorites')
    );
        if (movieFavs) {
        setFavourites(movieFavs);
        }
    }, []);

    // func to save titles to local storage
    const saveToLocalStorage = (params) => {
        localStorage.setItem('react-movie db-favorites', JSON.stringify(params));
    };

   // add favorites func w/ a movie as a parameter that copies the current array & returns a new 
   // one w/ the added movie, then saves it all into state
   const addFavMovie = movie => {
        const newFavList = [...favorites, movie];
        setFavourites(newFavList);
        saveToLocalStorage(newFavList);
    };

    // remove favorites func w/ a movie as a parameter that filters through favs and returns an array that doesn't include the arg
    const removeFavMovie = movie => {
        const newFavList = favorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID);
            setFavourites(newFavList);
            saveToLocalStorage(newFavList);
    } 
  

    // render a title as a prop in both headers
    // render search box while passing in the inputted value as a prop
    // render movies while passing all movies, add and remove favorite components, and add
    // and remove funcs as props
    return (
        <div className='app'>
            <div className='header'>
                <Header header='Explore Movies and TV shows' className='header'/>
                <p>"Carpe diem. Seize the day, boys. Make your lives extraordinary."
                <cite><a href='https://m.media-amazon.com/images/M/MV5BOGYwYWNjMzgtNGU4ZC00NWQ2LWEwZjUtMzE1Zjc3NjY3YTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'>-Dead Poets Society, 1989</a></cite></p>
                <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} />
            </div>

            <h1>Movies</h1>

            <div className='movies'>
                <AllMovies 
                    movies={movies} 
                    favoriteComponent={AddFavorites}
                    handleFavsClick={addFavMovie} 
            />
            </div>

            <h1>Favorites</h1>

            <div className='movies'>
                <AllMovies 
                    movies={favorites} 
                    favoriteComponent={RemoveFavorites} 
                    handleFavsClick={removeFavMovie}
                />
            </div>
        </div>
    )
};

export default App;