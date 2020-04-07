import { fetchAndParse } from '../utils'

const GLOBAL_CONFIRMED_CSV_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

const getConfirmedGlobal = async () => {
  try {
    const confirmedGlobal = await fetchAndParse(GLOBAL_CONFIRMED_CSV_URL)
    return confirmedGlobal
  } catch (error) {
    throw new Error("Something went wrong fetching data.");
  }
}

export default {
  confirmedAll: () => {
    return getConfirmedGlobal();
  },
  confirmed: async ({ regions }: { regions: string[]}) => {
    const confirmed = await getConfirmedGlobal()
    const filtered = []

    for (let region of regions) {
      let match = confirmed.find(({ name }: { name: string }) => name === region)
      match && filtered.push(match)
    }
    
    return filtered
  }
}
