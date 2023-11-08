import aws from 'aws-sdk';

// API response for type=all
// {
//   "statusCode": 201,
//   "items": {
//     "weekData": [
//       {
//         "1": 0.005107635,
//         "3": 0.005442919,
//         "4": 0.0014001609999999998,
//         "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//         "pluginId": "1234-1234-1245"
//       }
//     ],
//     "yearData": [
//       {
//         "220": 0.005107635,
//         "223": 0.00684308,
//         "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//         "pluginId": "1234-1234-1245"
//       }
//     ],
//     "monthData": [
//       {
//         "7": 0.011950715,
//         "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//         "pluginId": "1234-1234-1245"
//       }
//     ]
//   }
// }

// API response for type=perMonth
// {
//   "statusCode": 201,
//   "items": [
//     {
//       "7": 0.011950715,
//       "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//       "pluginId": "1234-1234-1245"
//     }
//   ]
// }

// API response for type=perDayOfWeek
// {
//   "statusCode": 201,
//   "items": [
//     {
//       "1": 0.005107635,
//       "3": 0.005442919,
//       "4": 0.0014001609999999998,
//       "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//       "pluginId": "1234-1234-1245"
//     }
//   ]
// }

// API response for type=perDayOfYear
// {
//   "statusCode": 201,
//   "items": [
//     {
//       "220": 0.005107635,
//       "223": 0.00684308,
//       "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//       "pluginId": "1234-1234-1245"
//     }
//   ]
// }

export type transactionsPerPaymentPointer = {
  paymentPointer: string;
  totalValue: number;
}

export type transactionsResults = {
  monthData: transactions[];
  yearData: transactions[];
  weekData: transactions[];
};

export type transactions = {
  [key: number]: number;
  paymentPointer:string;
  pluginId:string;
}

export const documentClient = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_REGION,
});