import AddFavorites from './AddFavorites';

/////////// create a movies component that'll pass them as props
const AllMovies = (props) => {
    // set favoriteComponent prop in a variable so it can be used as a component
    // render Favorite Component on line 21
    const FavoriteComponent = props.favoriteComponent;
    
    return (
        <>
            {props.movies.map((movie, idx) => ( // loop through movies 
                <div>
                    <img // display each movie cover image
                        className='image'
                        src={movie.Poster}
                        alt='movie cover'
                    >
                    </img>
                    <button
                        onClick={() => props.handleFavsClick(movie)} // add handleFavs prop to onClick func
                        className='click'
                    >
                        <FavoriteComponent /> 
                    </button>
                </div>
            ))}
        </>
    );
};

// const AllMovies = (props) => {
//     let renderMovies = (arr) => (
//         arr.map((movie, idx) => {
//             return <SingleMovie movie={movie} key={idx} />
//         })
//     )
//     return <div>{renderMovies(props.movie)}</div>
// }

export default AllMovies;