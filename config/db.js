const mongoose = require('mongoose');

const readConn = mongoose.createConnection(process.env.MONGO_URI_READ, { maxPoolSize: 5 });
const writeConn = mongoose.createConnection(process.env.MONGO_URI_WRITE, { maxPoolSize: 5 });

readConn.on('connected', () => console.log('[DB] READ connection ready'));
writeConn.on('connected', () => console.log('[DB] WRITE connection ready'));
readConn.on('error', (e) => console.error('[DB] READ error:', e.message));
writeConn.on('error', (e) => console.error('[DB] WRITE error:', e.message));

module.exports = { readConn, writeConn };
