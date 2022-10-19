export interface TransactionItem {
    date: number;
    value: number;
};
export interface TransactionRequest {
    pluginId: string;
    paymentPointer: string;
    date: number;
    totalValue: number;
    transactions: TransactionItem[]
};

export interface MonetizationDetail {
    paymentPointer: string;
    requestId?: string;
    amount: string;
    assetCode: string;
    assetScale: number;
    receipt?: string;
}

export interface MonetizationEvent {
    detail: MonetizationDetail;
}

export class Batcher {

    private transactionsList: TransactionItem[] = [];
    private timeout: number = 60 * 300;
    private pluginId: string | undefined = process.env.NEXT_PUBLIC_MONETIZATION_PLUGIN_ID
    private paymentPointer: string | undefined = process.env.NEXT_PUBLIC_MONETIZATION_PAYMENT_POINTER
    private requestURL: string | undefined = process.env.NEXT_PUBLIC_MONETIZATION_REQUEST_URL

    add(event: TransactionItem) {
        this.transactionsList.push(event);
    }

    async scheduleFlush() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                this.flush().then(() => {
                    resolve();
                    this.scheduleFlush();
                });
            }, this.timeout);
        });
    }

    private async flush() {
        if (this.pluginId != undefined && this.paymentPointer != undefined && this.requestURL != undefined) {
            const batch = this.transactionsList.map(({ date, value }) => ({
                date,
                value,
            }));
            if (batch.length === 0) {
                return;
            }
            const totalValue = this.transactionsList.reduce(
                (previousValue, currentValue) => previousValue + currentValue.value, 0
            );
            const data: TransactionRequest = {
                pluginId: this.pluginId,
                paymentPointer: this.paymentPointer,
                date: new Date().getTime(),
                totalValue: totalValue,
                transactions: this.transactionsList
            }
            await fetch(this.requestURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:
                {
                    'Content-Type': 'application/json',
                }
            });
            this.transactionsList = [];
        }
    }
}
