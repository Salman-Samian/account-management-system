import http from 'http';
import { depositToAccount } from "./src/controllers"
import "./src/types"

http.createServer((request, response) => {
    const { headers, method, url } = request;
    if (request.method === 'POST' && request.url === '/login') {
        let body: any = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const responseBody = { headers, method, url, body };
            response.on('error', (err) => {
                console.error(err);
            });
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(responseBody));
        });
    } else if (request.method === 'GET' && request.url === '/login') {
        request.on('error', (err) => {
            console.error(err);
        }).on('end', () => {
            response.on('error', (err) => {
                console.error(err);
            });
            response.statusCode = 200;
            response.write('<html>');
            response.write('<body>');
            response.write('<h1>Hello, World!</h1>');
            response.write('<p>Login Page</p>');
            response.write('</body>');
            response.write('</html>');
            response.end();
        });
    } else if (request.method === 'GET' && request.url === '/deposit') {
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
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080); // Activates this server, listening on port 8080.

console.log("Hello, this is server...");
