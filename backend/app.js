const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    '/graphql', 
    graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
})
);

mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@it2810-40.idi.ntnu.no:27017/${process.env.MONGO_DB}?auth=admin`,
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });
