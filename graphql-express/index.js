const app = require('express')();
const {graphqlHTTP} = require('express-graphql');
const graphql = require('graphql');


const schema = graphql.buildSchema(`
    type User {
        id: ID
        name: String
        repo: String
        age: Int
    }
    type Query {
        user(id: ID!): User
        users: [User]
    }
    type Mutation {
        createUser(name: String!, repo: String!, age: Int!): User
    }
`)

const resolvers = {
    user: ({id}) => {
        return repository.user.find( item => item.id === Number(id))
    },
    users: ()=> {
        return repository.user;
    },
    createUser: ({name, repo, age}) => {
        const user = {
            id: id++,
            name,
            repo,
            age
        }

        repository.user.push(user);

        return user;
    }
}
let id = 0;
const repository = {
    user: []
}


app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
  );
  
  app.listen(3000, () => {console.log("Ouvindo na porta 3000")} );

