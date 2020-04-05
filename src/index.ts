import express from 'express'
import graphqlHTTP from 'express-graphql'
import jhuResolver from './data-sources/jhu-csse/resolvers'
import schema from './schema'

const app = express()

const root = {
  ...jhuResolver
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4700)