import http from 'http';
import {
    depositToAccount,
    addAccount,
    balanceInquiryByAccount,
    performBlockTheAccount,
    retrievesTheAccountStatementOfTransactions,
    withdrawalOperation
} from "./src/controllers"
import "./src/types"

http.createServer((request, response) => {
    const { headers, method, url } = request;
    if (request.method === 'GET' && request.url === '/deposit') {
        const totalDeposit: number = 5;
        const account: Account = {
            accountId: 1,
            personId: {
                personId: 1,
                birthDate: new Date(),
                document: "Documents",
                name: "Salman Samian"
            },
            balance: 0,
            dailyWithdrawaLimit: 2000,
            activeFlag: false,
            accountType: 1,
            createDate: new Date()
        };
        depositToAccount(account, totalDeposit).then(res => {
            response.statusCode = 200;
            response.write(JSON.stringify(res));
            response.end();
        });
    } else if (request.method === 'GET' && request.url === '/balanceInquiry') {
        const account: Account = {
            accountId: 1,
            personId: {
                personId: 1,
                birthDate: new Date(),
                document: "Documents",
                name: "Salman Samian"
            },
            balance: 0,
            dailyWithdrawaLimit: 2000,
            activeFlag: false,
            accountType: 1,
            createDate: new Date()
        };
        balanceInquiryByAccount(account).then(res => {
            response.statusCode = 200;
            response.write(JSON.stringify(res));
            response.end();
        });
    } else if (request.method === 'GET' && request.url === '/withdraw') {
        const totalWithdraw: number = 965;
        const account: Account = {
            accountId: 1,
            personId: {
                personId: 1,
                birthDate: new Date(),
                document: "Documents",
                name: "Salman Samian"
            },
            balance: 0,
            dailyWithdrawaLimit: 2000,
            activeFlag: false,
            accountType: 1,
            createDate: new Date()
        };
        withdrawalOperation(account, totalWithdraw).then(res => {
            response.statusCode = 200;
            response.write(JSON.stringify(res));
            response.end();
        });
    } else if (request.method === 'GET' && request.url === '/blocktheaccount') {
        const account: Account = {
            accountId: 1,
            personId: {
                personId: 1,
                birthDate: new Date(),
                document: "Documents",
                name: "Salman Samian"
            },
            balance: 0,
            dailyWithdrawaLimit: 2000,
            activeFlag: false,
            accountType: 1,
            createDate: new Date()
        };
        performBlockTheAccount(account).then(res => {
            response.statusCode = 200;
            response.write(JSON.stringify(res));
            response.end();
        });
    } else if (request.method === 'GET' && request.url === '/accountstatement') {
        const account: Account = {
            accountId: 1,
            personId: {
                personId: 1,
                birthDate: new Date(),
                document: "Documents",
                name: "Salman Samian"
            },
            balance: 0,
            dailyWithdrawaLimit: 2000,
            activeFlag: false,
            accountType: 1,
            createDate: new Date()
        };
        console.log("you can check json data with validation here... 'https://jsonformatter.curiousconcept.com/'");
        retrievesTheAccountStatementOfTransactions(account).then(res => {
            response.statusCode = 200;
            response.write(JSON.stringify(res));
            response.end();
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080); // Activates this server, listening on port 8080.

console.log("Hello, this is server... 'http://localhost:8080'");


