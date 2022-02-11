import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            name
            yearOfPublication
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    if (loading) {
        return <h2>Loading...</h2>
    }
    // if (data) {
    //     console.log(data);
    // }
    if (error) {
        console.log(error);
    }

    if (movieError) {
        console.log(movieError);
    }

    return (
        <div>
            <div style={{ border: '5px solid blue' }}>
                {
                    data && data.users.map((user) => (
                        <div style={{ backgroundColor: '#FEE3EC' }}>
                            <h2>Name: {user.name}</h2>
                            <h3>Username: {user.username}</h3>
                            <h3>Age: {user.age}</h3>
                            <h3>Nationality: {user.nationality}</h3>
                        </div>
                    ))
                }
            </div>

            <div style={{ border: '5px solid red' }}>
                {
                    movieData && movieData.movies.map((movie) => (
                        <div style={{ backgroundColor: '#FFADAD' }}>
                            <h2>Movie Name: {movie.name}</h2>
                            <h3>Year Of Publication: {movie.yearOfPublication}</h3>
                        </div>
                    ))
                }
            </div>

            <div style={{ border: '5px solid green', padding: '20px 0px' }}>
                <input
                    type="text"
                    placeholder="Enter Movie Name"
                    onChange={(e) => { setMovieSearched(e.target.value) }}
                />
                <button
                    onClick={() => {
                        fetchMovie({
                            variables: {
                                name: movieSearched
                            }
                        });
                    }}> {" "}Fetch Data</button>
                <div>
                    {
                        movieSearchedData && (
                            <div>
                                {" "}
                                <h1>Movie Name: {movieSearchedData.movie.name}</h1>{" "}
                                <h2>Year Of Publication: {movieSearchedData.movie.yearOfPublication}</h2>{" "}
                            </div>
                        )
                    }
                    {movieError && <h3>*There was an error fetching data</h3>}
                </div>
            </div>
        </div>
    )
}

export default DisplayData;