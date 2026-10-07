const STUDENT_ID = process.env.STUDENT_ID || '23IT265';
const STUDENT_NAME = process.env.STUDENT_NAME || 'Nguyễn Xuân Thọ';

if (!STUDENT_ID || STUDENT_ID.length < 3) {
  throw new Error('STUDENT_ID không hợp lệ (cần ít nhất 3 ký tự).');
}

const lastChar = STUDENT_ID.slice(-1);
const lastDigit = Number(lastChar);
if (Number.isNaN(lastDigit)) {
  throw new Error('Ký tự cuối của STUDENT_ID phải là chữ số.');
}

module.exports = {
  STUDENT_ID,
  STUDENT_NAME,
  PREFIX: STUDENT_ID.slice(-3),                 // 3 số cuối (265)
  VAT: lastDigit + 5,                          // % = chữ số cuối + 5 (5 + 5 = 10%)
};
