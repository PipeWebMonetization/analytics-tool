import { NextApiRequest, NextApiResponse } from "next";
import { transactionsResults } from "../../../lib/database/databaseService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let results: transactionsResults = {
    perMonth: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      dateYear: 0,
      userId: "",
    },
  };
  // Fetch transactions per month
  try {
    const data = await fetch(
      "https://94w4fmrdq3.execute-api.us-east-1.amazonaws.com/Dev/api/transactions?userId=eiji&type=perMonth&dateYear=2022"
    );
    const payload = await data.json();
    if (payload.items.length > 0) {
      results.perMonth = payload.items[0];
    }
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
