import express from 'express'
import graphqlHTTP from 'express-graphql'
import jhuConfirmedResolver from './data-sources/jhu-csse/resolvers/confirmed'
import jhuDeathsResolver from './data-sources/jhu-csse/resolvers/deaths'
import jhuRecoveredResolver from './data-sources/jhu-csse/resolvers/recovered'
import schema from './schema'

const PORT = process.env.PORT || 8080;

const app = express()

const root = {
  ...jhuConfirmedResolver,
  ...jhuDeathsResolver,
  ...jhuRecoveredResolver
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.get('/', (request, response) => {
	response.redirect('https://github.com/jbailey4/covid-19-graphql')
})

app.listen(PORT)