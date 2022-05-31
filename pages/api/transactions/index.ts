import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetch(
      "https://94w4fmrdq3.execute-api.us-east-1.amazonaws.com/Dev/api/transactions?userId=eiji&type=perMonth"
    );
    const payload = await data.json();
    res.status(200).json(payload);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).end(error.message);
    } else {
      console.log("Unexpected error", error);
      return res.status(500).end(error);
    }
  }
};

export default handler;
