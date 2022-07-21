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
