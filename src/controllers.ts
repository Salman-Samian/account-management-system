import { readFileDataSource, writeFileDataSource } from "./utils/fileDataSource";
import { getDatesRange } from "./utils/dateUtil";

const filePathListTransactions = 'fakeDataBase/ListTransactions.json';
const filePathListAccounts = 'fakeDataBase/ListAccounts.json';

// ● Implement path that performs the creation of an account.
// creatAccount + and create an auto Person 
export function addAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
        console.log("add Account performed...");

        //Persons (it is not necessary to perform operations with the person table ) , create the table to
        //map the relationship with the account and send creation script of at least one person.
        const person: Person = {
            personId: 1,
            birthDate: new Date(2000, 9, 19),
            document: "Documents",
            name: "Salman Samian"
        };
        const new_account = { ...account };
        new_account.personId = person;

        if (new_account.personId.personId > 0) {
            resolve(new_account)
        } else {
            reject(account)
        }
    })
}



// ● Implement path that performs deposit operation on an account.
//depositToAccount
export async function depositToAccount(account: Account, totalDeposit: number): Promise<StatusMessage> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists !",
        code: 0,
        type: false
    };
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const accountIsExists = listAccounts.filter((x: Account) => x.accountId === account.accountId);
    if (accountIsExists.length == 1) {
        const dateRangefilters = getDatesRange();
        const listTransactions = await readFileDataSource(filePathListTransactions);
        const today_transactions =
            listTransactions
                .filter((x: Transactions) => {
                    return (new Date(x.transactionDate)).getTime() >= dateRangefilters.Yesterday.getTime() &&
                        (new Date(x.transactionDate)).getTime() <= dateRangefilters.Tomorrow.getTime();
                })
                .map((item: Transactions) => item.value);

        let sum_today_transactions = 0;
        if (today_transactions.length > 0)
            sum_today_transactions = today_transactions.reduce((prev: number, next: number) => prev + next);

        const remainDailyDepositValue = account.dailyWithdrawaLimit - sum_today_transactions;
        if (account.dailyWithdrawaLimit >= sum_today_transactions &&
            remainDailyDepositValue >= totalDeposit) {

            // update balance account 
            const indexAccount = listAccounts.findIndex((x: Account) => x.accountId == account.accountId);
            listAccounts[indexAccount].balance += totalDeposit;
            account = { ...listAccounts[indexAccount] };

            // add new Transaction
            const new_transactions: Transactions = {
                accountId: account,
                transactionDate: new Date(),
                transactionId: listTransactions.length + 1,
                value: totalDeposit
            };
            listTransactions.push(new_transactions);

            // update Transaction record
            const resultWriteFile = await writeFileDataSource(filePathListTransactions, JSON.stringify(listTransactions));
            if (resultWriteFile === "OK") {
                const resultWriteFileAccount = await writeFileDataSource(filePathListAccounts, JSON.stringify(listAccounts));
                if (resultWriteFileAccount === "OK") {
                    returnMessage.message = `${totalDeposit} value deposit successfully`;
                    returnMessage.type = true;
                }
            }
        } else {
            returnMessage.message = `you reached to your dealy limits and you just have this ${remainDailyDepositValue} left`;
            returnMessage.type = false;
        }
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}


// ● Implement path that performs balance inquiry operation on a given account.
// balanceInquiryByAccount
export async function balanceInquiryByAccount(account: Account, totalDeposit: number): Promise<StatusMessage> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists !",
        code: 0,
        type: false
    };
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const accountIsExists = listAccounts.filter((x: Account) => x.accountId === account.accountId);
    if (accountIsExists.length == 1) {
        const dateRangefilters = getDatesRange();
        const listTransactions = await readFileDataSource(filePathListTransactions);
        const today_transactions =
            listTransactions
                .filter((x: Transactions) => {
                    return (new Date(x.transactionDate)).getTime() >= dateRangefilters.Yesterday.getTime() &&
                        (new Date(x.transactionDate)).getTime() <= dateRangefilters.Tomorrow.getTime();
                })
                .map((item: Transactions) => item.value);

        let sum_today_transactions = 0;
        if (today_transactions.length > 0)
            sum_today_transactions = today_transactions.reduce((prev: number, next: number) => prev + next);

        const remainDailyDepositValue = account.dailyWithdrawaLimit - sum_today_transactions;
        if (account.dailyWithdrawaLimit >= sum_today_transactions &&
            remainDailyDepositValue >= totalDeposit) {

            // update balance account 
            const indexAccount = listAccounts.findIndex((x: Account) => x.accountId == account.accountId);
            listAccounts[indexAccount].balance += totalDeposit;
            account = { ...listAccounts[indexAccount] };

            // add new Transaction
            const new_transactions: Transactions = {
                accountId: account,
                transactionDate: new Date(),
                transactionId: listTransactions.length + 1,
                value: totalDeposit
            };
            listTransactions.push(new_transactions);

            // update Transaction record
            const resultWriteFile = await writeFileDataSource(filePathListTransactions, JSON.stringify(listTransactions));
            if (resultWriteFile === "OK") {
                const resultWriteFileAccount = await writeFileDataSource(filePathListAccounts, JSON.stringify(listAccounts));
                if (resultWriteFileAccount === "OK") {
                    returnMessage.message = `${totalDeposit} value deposit successfully`;
                    returnMessage.type = true;
                }
            }
        } else {
            returnMessage.message = `you reached to your dealy limits and you just have this ${remainDailyDepositValue} left`;
            returnMessage.type = false;
        }
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}


// ● Implement path that performs withdrawal operation on an account.
// withdrawalOperation


// ● Implement path that performs the blocking of an account.
// performBlockThePerson


// ● Implement path that retrieves the account statement of transactions.
// retrievesTheAccountAtatementOfTransactions
