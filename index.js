const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const fs = require('fs');

// Authentication setup using Baileys
const { state, saveState } = useSingleFileAuthState('auth_info.json');

async function startBot() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    printQRInTerminal: true,  // This will print QR code in terminal
    auth: state,
  });

  sock.ev.on('creds.update', saveState);  // Save authentication state
  sock.ev.on('open', () => {
    console.log('Connection established successfully!');
  });

  sock.ev.on('qr', (qr) => {
    console.log('Please scan the QR code:', qr); // Print QR code in terminal
  });

  sock.ev.on('messages.upsert', async (message) => {
    console.log('Received message:', message);
  });
}

startBot();
