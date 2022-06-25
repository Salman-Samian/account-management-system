import { readFileDataSource, writeFileDataSource } from "./utils/fileDataSource";
import { getDatesRange } from "./utils/dateUtil";

const filePathListTransactions = 'fakeDataBase/ListTransactions.json';
const filePathListAccounts = 'fakeDataBase/ListAccounts.json';

// ● Implement path that performs the creation of an account.
// creatAccount + and create an auto Person 
export function addAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
        readFileDataSource(filePathListAccounts).then(listAccounts => {
            const accountIsExists = listAccounts.filter((x: Account) => x.personId.name === account.personId.name);
            if (accountIsExists.length == 0) {
                console.log("add Account performed...");

                //Persons (it is not necessary to perform operations with the person table ) , create the table to
                //map the relationship with the account and send creation script of at least one person.                
                const new_account = { ...account };
                if (new_account.personId.personId > 0) {
                    resolve(new_account)
                } else {
                    reject(account);
                }
            }
        }).catch(error => {
            reject(account);
        });
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
        if (accountIsExists[0].activeFlag) { // acount not blocked
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
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}

// ● Implement path that performs balance inquiry operation on a given account.
// balanceInquiryByAccount
export async function balanceInquiryByAccount(account: Account): Promise<StatusMessage> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists or blocked!",
        code: 0,
        type: false
    };
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const indexAccount = listAccounts.findIndex((x: Account) => x.accountId == account.accountId);
    if (indexAccount > 0) {
        if (listAccounts[indexAccount].activeFlag) { // acount not blocked        
            const totalBalance = listAccounts[indexAccount].balance;
            returnMessage.message = `the balance is : ${totalBalance}`;
            returnMessage.type = true;
        }
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}

// ● Implement path that performs withdrawal operation on an account.
// withdrawalOperation
export async function withdrawalOperation(account: Account, totalWithdraw: number): Promise<StatusMessage> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists or blocked!",
        code: 0,
        type: false
    };
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const accountIsExists = listAccounts.filter((x: Account) => x.accountId === account.accountId);
    if (accountIsExists.length == 1) {
        const indexAccount = listAccounts.findIndex((x: Account) => x.accountId == account.accountId);
        // acount not blocked
        if (listAccounts[indexAccount].activeFlag && listAccounts[indexAccount].balance >= totalWithdraw) {
            const listTransactions = await readFileDataSource(filePathListTransactions);
            listAccounts[indexAccount].balance -= totalWithdraw;
            // update balance account                 
            account = { ...listAccounts[indexAccount] };
            // add new Transaction
            const new_transactions: Transactions = {
                accountId: account,
                transactionDate: new Date(),
                transactionId: listTransactions.length + 1,
                value: (totalWithdraw * -1)
            };
            listTransactions.push(new_transactions);

            // update Transaction record
            const resultWriteFile = await writeFileDataSource(filePathListTransactions, JSON.stringify(listTransactions));
            if (resultWriteFile === "OK") {
                const resultWriteFileAccount = await writeFileDataSource(filePathListAccounts, JSON.stringify(listAccounts));
                if (resultWriteFileAccount === "OK") {
                    returnMessage.message = `${totalWithdraw} value withdraw successfully`;
                    returnMessage.type = true;
                }
            }
        }
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}

// ● Implement path that performs the blocking of an account.
// performBlockThePerson
export async function performBlockTheAccount(account: Account): Promise<StatusMessage> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists !",
        code: 0,
        type: false
    };
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const accountIsExists = listAccounts.filter((x: Account) => x.accountId === account.accountId);
    if (accountIsExists.length == 1) {
        const indexAccount = listAccounts.findIndex((x: Account) => x.accountId == account.accountId);
        if (listAccounts[indexAccount].activeFlag) {
            listAccounts[indexAccount].activeFlag = false;
            const resultWriteFileAccount = await writeFileDataSource(filePathListAccounts, JSON.stringify(listAccounts));
            if (resultWriteFileAccount === "OK") {
                returnMessage.message = `${account.personId.name} Blocked successfully`;
                returnMessage.type = true;
            }
        }
    }
    console.log(returnMessage.message);
    return Promise.resolve(returnMessage);
}

// ● Implement path that retrieves the account statement of transactions.
// retrievesTheAccountStatementOfTransactions
export async function retrievesTheAccountStatementOfTransactions(account: Account): Promise<Transactions[]> {
    let returnMessage: StatusMessage = {
        message: "this account does not exists !",
        code: 0,
        type: false
    };
    let all_acount_transactions = [];
    const listAccounts = await readFileDataSource(filePathListAccounts);
    const accountIsExists = listAccounts.filter((x: Account) => x.accountId === account.accountId);
    if (accountIsExists.length == 1) {
        const listTransactions = await readFileDataSource(filePathListTransactions);
        all_acount_transactions = listTransactions.filter((x: Transactions) => x.accountId.accountId == account.accountId);
    }
    return Promise.resolve(all_acount_transactions);
}