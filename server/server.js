const express = require('express');
const path = require('path');
const db = require('./config/connection'); 
// const routes = require('./routes');     //remove this import since we are not using it anymore




const { ApolloServer } = require('apollo-server-express');  //use the ApolloServer class to create a new Apollo server instance
const { typeDefs, resolvers } = require('./schemas');        //import the typeDefs and resolvers from the schemas/index.js file
const app = express();                                      //create an instance of the ApolloServer class and pass in our schema data
// const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));            // change extended to from true to false to fix the deprecation warning
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);     //comment out. no longer needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// await server.start();    

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

// app.listen(PORT, () => {
// console.log(`API server running on port ${PORT}!`);
// log where we can go to test our GQL API
console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at
  ${url}`);
});
  

