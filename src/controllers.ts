import * as fs from 'fs';

// ● Implement path that performs the creation of an account.

import { readFileDataSource } from "./utils/fileDataSource";

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
export async function depositToAccount(account: Account, totalDeposit: any): Promise<StatusMessage> {
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);;

    let returnMessage: StatusMessage = {
        message: "",
        code: 0,
        type: false
    };
    const listTransactions = await readFileDataSource();
    const sum_today_transactions =
        listTransactions
            .filter((x: Transactions) => {
                return (new Date(x.transactionDate)).getTime() >= yesterday.getTime() &&
                    (new Date(x.transactionDate)).getTime() <= tomorrow.getTime();
            })
            .map((item: Transactions) => item.value)
            .reduce((prev: number, next: number) => prev + next);
    const remainDailyDepositValue = account.dailyWithdrawaLimit - sum_today_transactions;
    if (account.dailyWithdrawaLimit >= sum_today_transactions &&
        remainDailyDepositValue >= totalDeposit) {
        // add new Transaction
        const new_transactions: Transactions = {
            accountId: account,
            transactionDate: new Date(),
            transactionId: listTransactions.length + 1,
            value: totalDeposit
        };
        listTransactions.push(new_transactions);
        const new_json_file = JSON.stringify(listTransactions);

        try {
            fs.writeFile('fakeDataBase/ListTransactions.json', new_json_file, 'utf8', function (err_new_json_file) {
                if (err_new_json_file) {
                    console.log(err_new_json_file);
                }
            });
        } catch (error) {
            console.log(error);
        }

        returnMessage.message = `${totalDeposit} value deposited successfully`;
        returnMessage.type = true;

    } else {

        returnMessage.message = `you reached to your dealy limits and you just have this ${remainDailyDepositValue} left`;
        returnMessage.type = false;
    }
    return Promise.resolve(returnMessage);
}


// ● Implement path that performs balance inquiry operation on a given account.
// balanceInquiryByPerson


// ● Implement path that performs withdrawal operation on an account.
// withdrawalOperation


// ● Implement path that performs the blocking of an account.
// performBlockThePerson


// ● Implement path that retrieves the account statement of transactions.
// retrievesTheAccountAtatementOfTransactions
