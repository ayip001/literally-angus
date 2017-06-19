const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// EDIT THE APPSTATE FILE NAME HERE
login({appState: JSON.parse(fs.readFileSync('appstate_test.json', 'utf8'))}, (err, api) => {
    // 2fa:
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }

    // logged in:
    api.listen((err, message) => {
        // api.sendMessage(message.body, message.threadID);
    });
})
