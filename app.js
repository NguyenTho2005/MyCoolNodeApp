require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const sessionMiddleware = require('./config/session');
const booksRouter = require('./routes/books');

const app = express();

app.set('trust proxy', 1); // bắt buộc khi chạy sau proxy của Render (cookie secure)
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.get('/health', (req, res) => res.send('OK')); // dùng cho ping giữ app thức 24/7
app.use('/', booksRouter);

app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).send('Lỗi máy chủ.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
