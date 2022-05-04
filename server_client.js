const EXPRESS = require('express');
const HTTP = require('http');
const APP = EXPRESS(); 
const SERVER = HTTP.createServer(APP); 
const PORT = 3002;

APP.use((req, res, next)=>{
    res.status(200);
    res.sendFile('./index.html', { root: __dirname });
});

SERVER.listen(PORT, ()=>{
    console.log(`> Server Client Rodando na porta ${PORT}`);
});
