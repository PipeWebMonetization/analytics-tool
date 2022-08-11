import { NextApiRequest, NextApiResponse } from "next";
import { transactions, transactionsResults } from "../../../lib/database/databaseService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pluginId, type, dateYear } = req.query;
  // Fetch transactions
  try {
    const response = await fetch(`https://94w4fmrdq3.execute-api.us-east-1.amazonaws.com/Dev/api/transactions?pluginId=${pluginId}&type=${type}&dateYear=${dateYear}`);
    const data = await response.json();
    
    switch (type) {
      case 'perDayOfWeek':
        return res.status(200).json(data.items as transactions[]);
      case 'perDayOfYear':
        return res.status(200).json(data.items as transactions[]);
      case 'perMonth':
        return res.status(200).json(data.items as transactions[]);
      case 'all':
        return res.status(200).json(data.items as transactionsResults);
      default:
        return res.status(403).json({ message: 'Invalid request' });
    }

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(403).json({ message: 'Invalid request' });
    }
  }
};

export default handler;
