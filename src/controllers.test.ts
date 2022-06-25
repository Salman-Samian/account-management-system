import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();


import { depositToAccount } from './controllers';

describe('testing controller file', () => {

    test('make deposit to a person account', () => {
        const totalDeposit: number = 5;
        const ok_result: StatusMessage = {
            message: `${totalDeposit} value deposit successfully`,
            code: 0,
            type: true
        };
        const notok_result: StatusMessage = {
            message: "",
            code: 0,
            type: false
        }
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
        expect(depositToAccount(account, totalDeposit)).resolves.toEqual(ok_result);

        // expect(1 + 2).toBe(3);
    });
    // export function depositToAccount(account: Account, totalDeposit: any): Promise<StatusMessage> {

});