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

        type User {
            _id: ID!
            email: String!
            password: String
            createdGames: [Game!]
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        input GameInput {
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

        input UserInput {
            email: String!
            password: String!
          }

        type RootQuery {
            games(name: String!, skip: Int!): [Game!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createGame(gameInput: GameInput): Game
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `   
    )