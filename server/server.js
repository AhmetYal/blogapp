const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const mongoose = require("mongoose");

const MakaleModel = require("./models/MakaleModel");

const DB_URI =
  "mongodb+srv://test:test@blogcluster.jsl2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const typeDefs = gql`
  type Makale {
    id: ID!
    baslik: String!
    icerik: String!
  }

  type Query {
    makalelerGetir: [Makale]!
    makaleGetir(id: ID!): Makale!
  }

  type Mutation {
    makaleOlustur(baslik: String!, icerik: String!): Makale!
  }
`;

const resolvers = {
  Query: {
    async makalelerGetir() {
      const makaleler = await MakaleModel.find();
      return makaleler;
    },
    async makaleGetir(parent, args) {
      try {
        const { id } = args;
        return await MakaleModel.findById(id);
      } catch (error) {
        throw new error();
      }
    },
  },
  Mutation: {
    makaleOlustur: async (parent, args) => {
      try {
        const makale = {
          baslik: args.baslik,
          icerik: args.icerik,
        };

        return await MakaleModel.create(makale);
      } catch (error) {
        throw new error();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb bağlandı");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server ${res.url} adresinde çalışıyor`);
  });
