const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }

  type Movie {
    id: ID!
    title: String
    releaseDate: String
    rating: Int
    cast: [Actor]
    status: Status
  }

  type Actor {
    id: ID!
    name: String!
  }

  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }
`;

const movies = [
  {
    id: "1",
    title: "5 Deadly Venoms",
    releaseDate: "10-10-1983",
    rating: 5,
    cast: []
  },
  {
    id: "2",
    title: "36th Chamber",
    releaseDate: "10-10-1984",
    rating: 4,
    cast: [{ id: "asdf", name: "Gordon Liu" }]
  }
];

const resolvers = {
  Query: {
    movies: () => {
      return movies;
    },
    movie: (obj, args, context, info) => {
      return movies.find(movie => movie.id === args.id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => console.log(`Server started at ${url}`));
