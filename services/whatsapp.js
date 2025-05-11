const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('QR Code received, scan it with your WhatsApp!');
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

client.initialize();

const sendMessage = async (number, message) => {
  try {
    await client.sendMessage(`${number}@c.us`, message);
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

module.exports = { sendMessage };
