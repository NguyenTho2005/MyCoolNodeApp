const express = require('express');
const { BookRead, BookWrite } = require('../models/Book');
const { PREFIX, VAT, STUDENT_ID, STUDENT_NAME } = require('../utils/student');

const router = express.Router();
const student = { id: STUDENT_ID, name: STUDENT_NAME, vat: VAT, prefix: PREFIX };

// ĐỌC → tài khoản reader
router.get('/', async (req, res, next) => {
  try {
    req.session.views = (req.session.views || 0) + 1;
    const flash = req.session.flash;
    delete req.session.flash;

    const books = await BookRead.find().sort({ createdAt: -1 }).lean();
    res.render('index', { books, student, views: req.session.views, flash, form: {} });
  } catch (err) { next(err); }
});

// GHI → tài khoản writer
router.post('/books', async (req, res, next) => {
  const { code = '', title = '', author = '', price } = req.body;
  const form = { code, title, author, price };

  const fail = async (status, message) => {
    const books = await BookRead.find().sort({ createdAt: -1 }).lean();
    return res.status(status).render('index', {
      books, student, views: req.session.views || 0,
      flash: { type: 'err', message }, form,
    });
  };

  try {
    // 1) Bộ lọc mã sản phẩm: bắt buộc bắt đầu bằng 3 số cuối MSSV
    if (!code.trim().startsWith(PREFIX)) {
      return fail(400, `Mã sách phải bắt đầu bằng ${PREFIX} (3 số cuối MSSV). Yêu cầu bị từ chối.`);
    }
    const priceNum = Number(price);
    if (!title.trim()) return fail(400, 'Tên sách không được để trống.');
    if (!Number.isFinite(priceNum) || priceNum <= 0) return fail(400, 'Giá không hợp lệ.');

    // 2) Kiểm tra trùng mã (đọc bằng reader)
    if (await BookRead.exists({ code: code.trim() })) {
      return fail(409, 'Mã sách đã tồn tại.');
    }

    // 3) Tính giá sau thuế TRƯỚC khi lưu
    const priceAfterTax = Math.round(priceNum * (1 + VAT / 100) * 100) / 100;

    // 4) Ghi bằng writer
    await BookWrite.create({
      code: code.trim(), title: title.trim(), author: author.trim(),
      price: priceNum, vat: VAT, priceAfterTax,
    });

    req.session.flash = { type: 'ok', message: 'Đã thêm sách thành công.' };
    res.redirect('/');
  } catch (err) { next(err); }
});

module.exports = router;
