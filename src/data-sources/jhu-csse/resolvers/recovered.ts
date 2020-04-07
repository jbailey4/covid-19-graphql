import { fetchAndParse } from '../utils'

const GLOBAL_RECOVERED_CSV_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

const getRecoveredGlobal = async () => {
  try {
    const recoveredGlobal = await fetchAndParse(GLOBAL_RECOVERED_CSV_URL)
    return recoveredGlobal
  } catch (error) {
    throw new Error("Something went wrong fetching data.");
  }
}

export default {
  recoveredAll: () => {
    return getRecoveredGlobal();
  },
  recovered: async ({ regions }: { regions: string[]}) => {
    const confirmed = await getRecoveredGlobal()
    const filtered = []

    for (let region of regions) {
      let match = confirmed.find(({ name }: { name: string }) => name === region)
      match && filtered.push(match)
    }

    console.log(filtered)
    
    return filtered
  }
}
