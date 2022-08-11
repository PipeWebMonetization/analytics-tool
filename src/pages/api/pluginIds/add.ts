import { NextApiRequest, NextApiResponse } from "next";
import { documentClient } from "../../../lib/database/databaseService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, pluginId } = JSON.parse(req.body);
  if (req.method === "POST") {
    console.log(email, pluginId);
    const params = {
      TableName: "pluginIds",
      Item: {
        userEmail: email,
        pluginId: pluginId,
      },
    };
    documentClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: data });
      }
    });
  } else {
    res.status(405).json({ Error: "Method not allowed" });
  }
};

export default handler;
