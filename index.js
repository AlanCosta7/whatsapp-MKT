const qrcode = require('qrcode-terminal');
const fs = require('fs');
const contatos = require('./contatos');

const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData // saved session object
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});

});

client.on('ready', () => {
    var msg = `*Cardappio Digital* \nPAGUE APENAS POR PEDIDOS RECEBIDOS \n\npara cada pedido que você recebe, pagará apenas *R$0,25*. \nMas calma... você não vai pagar mais do que *R$100/mês* na sua fatura. \n\n=> Montamos todo o seu cardappio sem compromisso \n=> Sem taxa de adesão e cancelamento \n=> Suporte tecnico e treinamento para funcionários \n=> QR-Code para comanda eletrônica \n=> Design moderno \n\nVamos montar o seu Cardappio Digital?`

    contatos.db.forEach(element => {
        var item = `55${element}@c.us`
        client.sendMessage(item, msg);
    });

    
});



client.initialize();