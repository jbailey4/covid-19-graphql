export default `
  type Coordinates {
    latitude: Float,
    longitude: Float
  }
  type TimeSeriesEntry {
    date: String,
    count: Int!
  }
  type Region {
    name: String,
    province: String,
    coordinates: Coordinates,
    timeseries: [TimeSeriesEntry]
  }
`