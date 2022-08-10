import aws from 'aws-sdk';

export type transactionsResults = {
  perMonth?: transactionsPerMonth;
  perDay?: transactionsPerDayOfYear;
  perWeek?: transactionsPerDayOfWeek;
};

export type transactionsPerMonth = {
  [key: number]: number;
  dateYear: number;
  userId: string;
};

export type transactionsPerDayOfYear = {
  [key: number]: number;
  dateYear?: number;
  userId?: string;
};

export type transactionsPerDayOfWeek = {
  [key: number]: number;
  userId?: string;
}

export const documentClient = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});