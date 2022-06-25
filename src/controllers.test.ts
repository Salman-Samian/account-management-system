import { enableFetchMocks } from 'jest-fetch-mock'
import {
    depositToAccount,
    addAccount,
    balanceInquiryByAccount,
    performBlockTheAccount,
    retrievesTheAccountStatementOfTransactions,
    withdrawalOperation
} from './controllers';

enableFetchMocks();

describe('testing controller file', () => {

    // initial data
    const totalDeposit: number = 5;
    const totalWithdraw: number = 100;
    const person: Person = {
        personId: 1,
        birthDate: new Date(2000, 9, 19),
        document: "Documents",
        name: "Salman Samian"
    };
    const notok_result: StatusMessage = {
        message: "",
        code: 0,
        type: false
    };
    const account: Account = {
        accountId: 1,
        personId: person,
        balance: 0,
        dailyWithdrawaLimit: 2000,
        activeFlag: false,
        accountType: 1,
        createDate: new Date()
    };


    test('add new account', () => {        
        expect(addAccount(account)).resolves.toEqual(account);
    });

    test('make deposit to a person account', () => {
        const ok_result: StatusMessage = {
            message: `${totalDeposit} value deposit successfully`,
            code: 0,
            type: true
        };
        expect(depositToAccount(account, totalDeposit)).resolves.toEqual(ok_result);
    });

    test('withdrawal Operation', () => {
        expect(withdrawalOperation(account, totalWithdraw)).resolves.toEqual(notok_result);
    });

    test('make balance Inquiry By Account', () => {
        expect(balanceInquiryByAccount(account)).resolves.toEqual(notok_result);
    });

    test('retrieves account Statement', () => {
        expect(retrievesTheAccountStatementOfTransactions(account)).resolves.toEqual(notok_result);
    });

    // if you run this test the user will be block and you should manually retrive in using the json file.
    // test('perform Block the account', () => {
    //     expect(performBlockTheAccount(account)).resolves.toEqual(notok_result);
    // });
});