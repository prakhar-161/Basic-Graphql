import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './DisplayData';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h3>---------------D.E.M.O---------------</h3>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
