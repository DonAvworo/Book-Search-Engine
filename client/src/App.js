import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  url: '/graphql',
  cache: new InMemoryCache (),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      
          <Navbar />
          <Routes>
            <Route 
              exact path='/' 
              component={<SearchBooks />}   // refactor the SearchBooks component to use the useMutation() Hook to execute the SAVE_BOOK mutation in the utils/mutations.js file
            />
            <Route 
              exact path='/saved' 
              component={<SavedBooks />} 
            />
            <Route 
              render = {() => <h1 className='display-2'>Wrong page!</h1>}
              
            />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
