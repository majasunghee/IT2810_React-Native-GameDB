const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Game {
            _id: ID!
            name: String!
            platform: String!
            msrp: Float!
            publisher: String!
            developer: String!
            esrb: String!
            releasedate: String!
            romfilesize: String!
            genre: String!
            storelink: String!
            officialsite: String!
       }
        type RootQuery {
            games(name: String!, skip: Int!): [Game!]!
        }

        schema {
            query: RootQuery
        }
    `   
    )