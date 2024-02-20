const express = require('express');
const app = express();
const hostname = '127.0.0.1'; // Your server ip address
const port = 3000;

const version = '1.0.0';

app.get('/', (req, res) => {
    // set response content    
        res.json({hola: "mundo"});
 
  console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

})

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})
