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

export function writeFileDataSource(filePath: any, new_json_file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, new_json_file, 'utf8', function (err_new_json_file) {
            if (err_new_json_file) {
                reject(err_new_json_file);
            } else {
                resolve("OK");
            }
        });
    });
}
