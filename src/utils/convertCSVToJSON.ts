import csv from "csvtojson";
import axios from "axios";

export const fetchAndConvertCsv = async (url: string) => {
  const response = await axios.get(url)
  return convertCsvToJson(response.data)
}

export const convertCsvToJson = async (dataString: string) => {
  return csv({
    noheader: true,
    output: "csv"
  }).fromString(dataString)
} 