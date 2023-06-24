import React from 'react';
import {useEffect,useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL='https://www.omdbapi.com?apikey=a88547e2';

const App = () => {

    const [movies,setmovies] =useState([]);

    const [searchterm,setsearchterm]=useState('');
    
    const searchmovies= async (title) =>{
        const response=await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setmovies(data.Search);
    }

    useEffect(()=>{
        searchmovies('Interstellar');
    },[]);

    return (
        <div className="app">
            <h1>MovieMania</h1>
            
            <div className="search">
                <input
                    placeholder='Search for Movies'
                    value={searchterm}
                    onChange={(event)=>{setsearchterm(event.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={()=>searchmovies(searchterm)}
                />
            </div>

            {
                movies?.length>0 ?
                (
                    <div className="container">
                        {movies.map((movie) =>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No Movies Matches Your Search</h2>
                    </div>
                )
            }

            

        </div>
    );
}

export default App;