import { buildSchema } from 'graphql'
import jhuSchema from './data-sources/jhu-csse/schema'

export default buildSchema(`
  ${jhuSchema}
  type Query {
    confirmedAll: [Region]
    confirmed(regions: [String]): [Region]
    deathsAll: [Region]
    deaths(regions: [String]): [Region]
    recoveredAll: [Region]
    recovered(regions: [String]): [Region]
  }
`);