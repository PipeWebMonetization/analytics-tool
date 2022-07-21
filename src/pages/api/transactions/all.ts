import { NextApiRequest, NextApiResponse } from "next";
import { transactionsPerDayOfWeek, transactionsPerDayOfYear, transactionsPerMonth, transactionsResults } from "../../../lib/database/databaseService";

interface endpointResponse {
  statusCode: number;
  items: {
    weekData: transactionsPerDayOfWeek[];
    monthData: transactionsPerMonth[];
    yearData: transactionsPerDayOfYear[];
  }
}

// API 'all' endpoint response map:
// {
//   "statusCode": 201,
//   "items": {
//     "weekData": [
//       {
//         "5": 123,
//         "userId": "eiji"
//       }
//     ],
//     "yearData": [
//       {
//         "161": 200,
//         "dateYear": 2022,
//         "userId": "eiji"
//       }
//     ],
//     "monthData": [
//       {
//         "1": 250,
//         "2": 128,
//         "3": 345,
//         "4": 487,
//         "5": 310,
//         "6": 574,
//         "7": 497,
//         "8": 609,
//         "9": 712,
//         "10": 647,
//         "11": 812,
//         "12": 1023,
//         "dateYear": 2022,
//         "userId": "eiji"
//       }
//     ]
//   }
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  let results: transactionsResults = {};

  // Fetch transactions
  try {
    const data = await fetch(
      "https://94w4fmrdq3.execute-api.us-east-1.amazonaws.com/Dev/api/transactions?userId=userid_test-user3&type=all&dateYear=2022"
    );
    const payload: endpointResponse = await data.json();
    results.perMonth = payload.items.monthData[0];
    results.perDay = payload.items.yearData[0];
    results.perWeek = payload.items.weekData[0];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error", error);
    }
  }
  return res.status(200).json(results);
};

export default handler;
