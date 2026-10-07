const session = require('express-session');
const MongoStore = require('connect-mongo');

const isProd = process.env.NODE_ENV === 'production';

module.exports = session({
  secret: process.env.SESSION_SECRET || 'secret-dev-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_WRITE,   // dùng tài khoản writer (có quyền trên collection sessions)
    collectionName: 'sessions',
    ttl: 60 * 60 * 24,                       // 1 ngày
    createAutoRemove: 'interval',
    autoRemoveInterval: 10,
  }),
  cookie: {
    httpOnly: true,
    secure: isProd,                          // HTTPS trên Render
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
});
