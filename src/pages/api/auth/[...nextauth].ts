import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  region: process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export default NextAuth({
  adapter: DynamoDBAdapter(client, { tableName: "PipeWebMonetization" }),
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.NEXT_PUBLIC_SMTP_HOST,
        port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
        auth: {
          user: process.env.NEXT_PUBLIC_SMTP_USER,
          pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD
        },
      },
      from: process.env.NEXT_PUBLIC_SMTP_FROM,
    }),
  ],
});
