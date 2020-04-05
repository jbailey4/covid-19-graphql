import { buildSchema } from 'graphql'
import jhuSchema from './data-sources/jhu-csse/schema'

export default buildSchema(`
  ${jhuSchema}
  type Query {
    confirmedAll: [Region]
    confirmed(regions: [String]): [Region]
  }
`);