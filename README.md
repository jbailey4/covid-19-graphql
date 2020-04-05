# COVID-19 GraphQL API

An API providing data relating to the COVID-19 outbreak, written using the [GraphQL](https://graphql.org/) query language. The underlying data is based on the [CSSEGISandData/COVID-19 repository](https://github.com/CSSEGISandData/COVID-19) maintained by the Johns Hopkins University Center for Systems Science and Engineering (JHU CSSE).

## Running

- Fork & clone the repo
- `yarn`
- `yarn start:dev`

## Tools Used

- [`typescript`](https://www.typescriptlang.org/)
- [`express`](https://expressjs.com/)
- [`express-graphql`](https://github.com/graphql/express-graphql)
- [`axios`](https://github.com/axios/axios)
- [`csvtojson`](https://github.com/Keyang/node-csvtojson)
  - used to parse data fetched from the JHU repo
