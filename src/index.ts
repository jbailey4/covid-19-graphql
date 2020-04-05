import express from 'express'
import graphqlHTTP from 'express-graphql'
import jhuResolver from './data-sources/jhu-csse/resolvers'
import schema from './schema'

const PORT = process.env.PORT || 8080;

const app = express()

const root = {
  ...jhuResolver
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.get('/', (request, response) => {
	response.redirect('https://github.com/jbailey4/covid-19-graphql')
})

app.listen(PORT)