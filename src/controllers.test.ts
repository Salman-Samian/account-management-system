import { depositToAccount } from './controllers';

describe('testing controller file', () => {

    test('make deposit to a person account', () => {
        const totalDeposit: number = 1000;
        const ok_result: StatusMessage = {
            message: `${totalDeposit} value deposited successfully`,
            code: 0,
            type: true
        };
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

        expect(depositToAccount(account, totalDeposit)).toBe(ok_result);
    });
    // export function depositToAccount(account: Account, totalDeposit: any): Promise<StatusMessage> {

});