const mongoose = require('mongoose');
const { readConn, writeConn } = require('../config/db');

const bookSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true },
    priceAfterTax: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'books',
    autoIndex: false,    // user không có quyền createIndex
    autoCreate: false,   // user không có quyền createCollection
  }
);

module.exports = {
  BookRead: readConn.model('Book', bookSchema),   // chỉ dùng find
  BookWrite: writeConn.model('Book', bookSchema), // chỉ dùng create/insert
};
