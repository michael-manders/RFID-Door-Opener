const fs = require("fs");

module.exports = {execute};

function execute (password, timestamp, id, action, res) {
    if (password === process.CONFIG.masterPassword) {
        d = new Date(timestamp * 1000)
        fiN = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;
        try{
            json = JSON.parse(fs.readFileSync(`./logs/${fiN}.json`, "utf-8"));
        }
        catch (e) {
            json = {}
        }
        json[timestamp] = {
            "id": id,
            "opened": action
        }
        try {
        fs.writeFileSync(`.logs/${fiN}.json`, JSON.stringify(json, null, 2));
        }
        catch (e) {
            var createStream = fs.createWriteStream(`./logs/${fiN}.json`);
            createStream.end();
            fs.writeFileSync(`./logs/${fiN}.json`, JSON.stringify(json, null, 2));

        }
        res.end("sucsess");
        
    }
    else {
        res.end("incorrect password");
    }
}