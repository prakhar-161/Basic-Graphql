import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

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

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
        }
    }
`;

function DisplayData() {
    // GetMovieByName
    const [movieSearched, setMovieSearched] = useState("");

    // Create User states
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <div style={{ border: '5px solid orange', padding: '20px 0px' }}>
                <input
                    type="text"
                    placeholder='Enter name'
                    onChange={(e) => { setName(e.target.value) }}
                />
                <input
                    type="text"
                    placeholder='Enter username'
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <input
                    type="number"
                    placeholder='Enter age'
                    onChange={(e) => { setAge(e.target.value) }}
                />
                <input
                    type="text"
                    placeholder='Enter nationality'
                    onChange={(e) => { setNationality(e.target.value.toUpperCase()) }}
                />
                <button
                    onClick={() => {
                        createUser({
                            variables: {
                                input: { name, username, age: Number(age), nationality }
                            }
                        });

                        refetch();
                    }}
                > 
                    Create User 
                </button>
            </div>

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