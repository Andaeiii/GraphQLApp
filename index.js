const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 6969;

//import the graphQL requirements. 
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas');  //since there's an index.js there it automatically works.. 

//enable all cors request...
app.use(cors());

//config the grapQL. 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log('server running..');
})