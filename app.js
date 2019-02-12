const express = require('express')
const app = express()
const rp = require('request-promise');
const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.json({ name: 'bridge is ok' });

})

app.post('/', (req, res) => {

 console.log('req.body ------ ', req.body);
 let name = req.body.methodName;
 let key = '12345';
 delete req.body.methodName;
 let data = req.body;
	console.log(data)

 try {
     async function main() {
         let bridgeUrl = 'http://192.168.99.2:9002/sendMessage';
         let ops = {
             method: 'POST',
             uri: bridgeUrl,
             body: {
                name,
                key,
                data
             },
             json: true // Automatically stringifies the body to JSON
         };
         let resdata = await rp(ops);
         res.json(resdata);
     }
     main()

 } catch (e) {
     res.json({ error: e, options: options });
 }

})
