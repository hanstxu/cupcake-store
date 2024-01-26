const express = require('express');

const fs = require('fs');
const https = require('https');

const { router: cupcakeStoreRouter } = require('./routes/cupcake-store-router');

const app = express();
app.use(express.json());
app.use('/v2/cupcake', cupcakeStoreRouter);

const PORT = 7500;

const args = process.argv;
if (args.length > 1 && args[2] === "https") {
    let privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
    let certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

    let credentials = {key: privateKey, cert: certificate};
    https.createServer(credentials, app)
         .listen(PORT, () => { console.log("Https server started at PORT: %s", PORT); });

} else {
    app.listen(PORT, () => { console.log("Http server started at PORT: %s", PORT); });
}
