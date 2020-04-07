import { fetchAndConvertCsv } from "../../utils/convertCSVToJSON";

export const parse = (json: Record<string, any>) => {
  const headers = json.shift();
  const nonTimeseriesHeaders = headers.slice(0, 4);
  const timeseriesHeaders = headers.slice(4);

  return json.reduce((regionsParsed: any[], region: any[]) => {
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
  })
}

export const fetchAndParse = async (url: string) => {
  try {
    const raw = await fetchAndConvertCsv(url);
    return parse(raw)
  } catch (error) {
    throw new Error("Something went wrong fetching data.");
  }
}