const WS = require('ws');
const PORT = 3000;
const SERVER = new WS.WebSocketServer({ port: PORT }, () => log(`Server Socket Rodando na porta ${PORT}`));
const DEBUG = true;
const RECEIVEMYMESSAGES = false;
const CLIENTS = {};

SERVER.on("connection", (socket) => {
    socket.clientId = generateId();
    CLIENTS[socket.clientId] = socket;
    log(`Cliente ${socket.clientId} conectado! Clientes: ${JSON.stringify(Object.keys(CLIENTS))}`);

    socket.on("message", onMessage);
    socket.close = onClose;
    socket.error = onError;
});

function onMessage(buffer) {
    log('onMessage');
    let msg = buffer.toString();
    Object.keys(CLIENTS).forEach(id => {
        if(RECEIVEMYMESSAGES || (this.clientId != id)){
            CLIENTS[id].send(defaultComunication(this.clientId, id, msg));
        }
    });
}

function onClose() {
    if(CLIENTS[this.clientId] != undefined){
        log(`O cliente ${this.clientId} foi desconectado!`);
        delete CLIENTS[this.clientId];
    }
}

function onError(err) {
    log(`Ocorreu um erro:`);
    log(err);
    if(CLIENTS[this.clientId] != undefined){
        CLIENTS[this.clientId].close();
    }
}

function generateId() {
    let currentId = Math.floor(Math.random() * 10000);
    if(CLIENTS[currentId] === undefined) return currentId;
    generateId();
}

function defaultComunication(origin, destination, originalMessage) {
    defaultMsg = {
        'origin': origin,
        'destination': destination,
        'msg': originalMessage,
    };

    log(defaultMsg);
    return JSON.stringify(defaultMsg);
}

function log(msg) {
    if (DEBUG){
        let aux = msg;
        if (typeof msg !== 'string'){
            aux = JSON.stringify(msg);
        }
        console.log(`${new Date().toLocaleString("pt-BR")} > ${aux}`);
    }
}