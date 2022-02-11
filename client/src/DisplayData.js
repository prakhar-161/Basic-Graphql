import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

function DisplayData() {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

    if (loading) {
        return <h2>Loading...</h2>
    }

    // if (data) {
    //     console.log(data);
    // }

    if (error) {
        console.log(error);
    }

    return (
        <>
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
        </>
    )
}

export default DisplayData;