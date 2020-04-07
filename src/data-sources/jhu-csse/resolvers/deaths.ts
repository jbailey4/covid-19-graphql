import { fetchAndParse } from '../utils'

const GLOBAL_DEATHS_CSV_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

const getDeathsGlobal = async () => {
  try {
    const deathsGlobal = await fetchAndParse(GLOBAL_DEATHS_CSV_URL)
    return deathsGlobal
  } catch (error) {
    throw new Error("Something went wrong fetching data.")
  }
}

export default {
  deathsAll: () => {
    return getDeathsGlobal();
  },
  deaths: async ({ regions }: { regions: string[]}) => {
    const confirmed = await getDeathsGlobal()
    const filtered = []

    for (let region of regions) {
      let match = confirmed.find(({ name }: { name: string }) => name === region)
      match && filtered.push(match)
    }
    
    return filtered
  }
}
