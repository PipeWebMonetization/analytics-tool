import { NextApiRequest, NextApiResponse } from "next";
import { documentClient } from "../../../lib/database/databaseService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  const params = {
    TableName: "pluginIds",
    KeyConditionExpression: "userEmail = :userEmail",
    ExpressionAttributeValues: {
      ":userEmail": (email as string) ?? "",
    },
  };

  documentClient.query(params, (error, data) => {
    if (error) {
      res.status(500).json({ Error: error });
    } else {
      res.status(200).json(data);
    }
  });
};

export default handler;
