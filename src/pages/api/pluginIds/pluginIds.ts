import { NextApiRequest, NextApiResponse } from "next";
import { documentClient } from "../../../lib/database/databaseService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const params = {
        TableName: "pluginIds",
        KeyConditionExpression:
            "userEmail = :userEmail",
        ExpressionAttributeValues: {
            ":userEmail": req.query.email ?? ""
        },
    };

    documentClient.query(params, (error, data) => {
        if (error) {
            res.status(500).json({Error: error})
        } else {
            res.status(200).json(data);
        }
    });
};

export default handler;