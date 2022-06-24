import * as fs from 'fs';
const filePath = 'fakeDataBase/ListTransactions.json';

export function readFileDataSource(): Promise<Transactions[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileContent) => {
            var data;
            if (err) {                
                reject(err);
            } else {
                data = JSON.parse(fileContent.toString());
                resolve(data);
            }
        });
    })
};

