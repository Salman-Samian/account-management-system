import * as fs from 'fs';

export function readFileDataSource(filePath: string): Promise<any[]> {
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

