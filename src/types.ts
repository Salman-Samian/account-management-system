type Person = {
    personId: number;
    name: string;
    document: any;
    birthDate: Date;
};

type Account = {
    accountId: number;
    personId: Person;
    balance: any;
    dailyWithdrawaLimit: any;
    activeFlag: boolean;
    accountType: number;
    createDate: Date;
};

type Transactions = {
    transactionId: number,
    accountId: Account,
    value: number,
    transactionDate: Date
};

type StatusMessage = {
    message: string,
    code: number,
    type: boolean
};