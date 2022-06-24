import * as fs from 'fs';

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
export function depositToAccount(account: Account, totalDeposit: any): Promise<StatusMessage> {
    const yesterday = new Date(-1);
    const tomorrow = new Date(+1);

    console.log(yesterday);
    console.log(tomorrow);
    let returnMessage: StatusMessage = {
        message: "",
        code: 0,
        type: false
    };
    return fetch('../fakeDataBase/ListTransactions.json')
        .then(res => {
            const listTransactions = JSON.parse(res.toString());
            const sum_today_transactions =
                listTransactions
                    .filter((x: Transactions) => {
                        return x.transactionDate.getTime() >= yesterday.getTime() &&
                            x.transactionDate.getTime() <= tomorrow.getTime();
                    })
                    .map((item: Transactions) => item.value)
                    .reduce((prev: number, next: number) => prev + next);

            if (account.dailyWithdrawaLimit >= sum_today_transactions) {
                // add new Transaction
                const new_transactions: Transactions = {
                    accountId: account,
                    transactionDate: new Date(),
                    transactionId: listTransactions.length,
                    value: totalDeposit
                };
                listTransactions.push(new_transactions);
                const new_json_file = JSON.stringify(listTransactions);

                fs.writeFile('../fakeDataBase/ListTransactions.json', new_json_file, 'utf8', function (err_new_json_file) {
                    if (err_new_json_file) {
                        console.log(err_new_json_file);
                    }
                });

                returnMessage.message = `${totalDeposit} value deposited successfully`;
                returnMessage.type = true;

            } else {
                const remainDailyDepositValue = sum_today_transactions - account.dailyWithdrawaLimit;
                returnMessage.message = `you reached to your dealy limits and you just have this ${remainDailyDepositValue} left`;
                returnMessage.type = false;
            }
            return returnMessage;
        });
}


// ● Implement path that performs balance inquiry operation on a given account.
// balanceInquiryByPerson


// ● Implement path that performs withdrawal operation on an account.
// withdrawalOperation


// ● Implement path that performs the blocking of an account.
// performBlockThePerson


// ● Implement path that retrieves the account statement of transactions.
// retrievesTheAccountAtatementOfTransactions
