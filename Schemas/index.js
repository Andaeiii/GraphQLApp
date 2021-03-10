const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;

const userData = require('../MOCK_DATA.json');
const UserType = require('./TypeDefs/UserType');  //import the usetypes.. 


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


//const schema = new graphql.GraphQLSchema({query:  RootQuery, mutation: Mutation })

module.exports = new GraphQLSchema({query:  RootQuery, mutation: Mutation })