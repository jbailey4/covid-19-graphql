import { fetchAndConvertCsv } from "../../utils/convertCSVToJSON";

const GLOBAL_CONFIRMED_CSV_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

export const getConfirmedGlobal = async () => {
  try {
    const raw = await fetchAndConvertCsv(GLOBAL_CONFIRMED_CSV_URL);

    console.log('*** FETCHED JHU CSSE DATA VIA GITHUB DATASTORE ***')

    const headers = raw.shift();
    const nonTimeseriesHeaders = headers.slice(0, 4);
    const timeseriesHeaders = headers.slice(4);

    return raw.reduce((regionsParsed: any[], region: any[]) => {
      const nonTimeseriesData = region.slice(0, 4);
      const timeseriesData = region.slice(4);

      const parsedRegion = {
        name: nonTimeseriesData[1],
        [nonTimeseriesHeaders[0]]: nonTimeseriesData[0],
        coordinates: {
          latitude: Number(nonTimeseriesData[2]),
          longitude: Number(nonTimeseriesData[3])
        },
        timeseries: timeseriesData.map((confirmedCases: number, i: number) => ({
          date: timeseriesHeaders[i],
          count: confirmedCases
        }))
      };

      regionsParsed.push(parsedRegion);

      return regionsParsed;
    }, []);
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
