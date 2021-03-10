const express = require("express");
const app = express();
const PORT = 6969;
const userData = require('./MOCK_DATA.json');

//import the graphQL requirements. 
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const {graphqlHTTP} = require('express-graphql');


const UserType = new GraphQLObjectType({
    name:"User",
    fields: () => ({
        id:         {type:GraphQLInt},
        firstName:  {type:GraphQLString},
        lastName:   {type:GraphQLString},
        email:      {type:GraphQLString},
        password:   {type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{

        //create your queries here... 
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt }},
            resolve(parent, args){
                return userData
            }
        }
        //more queries here..

    }
});


const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser: {
            type: UserType,
            args: {
                firstName:  {type:GraphQLString},
                lastName:   {type:GraphQLString},
                email:      {type:GraphQLString},
                password:   {type:GraphQLString} 
            },
            resolve(parents, args){
                //database login to insert to dbase... 
                userData.push({
                    id:userData.length + 1,
                    firstname: args.firstName,
                    lastName:args.lastName,
                    email: args.email,
                    password: args.password
                });
                return args
            }
        }
    }
})


const schema = new graphql.GraphQLSchema({
    query:  RootQuery,
    mutation: Mutation
})

//config the grapQL. 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(PORT, ()=> {
    console.log('server running..');
})