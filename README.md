# Ứng Dụng Quản Lý Sách (Cloud Computing Midterm)

## Thông Tin Sinh Viên
- **Họ và tên**: Nguyễn Xuân Thọ
- **MSSV**: 23IT265
- **3 số cuối MSSV**: 265 (Tiền tố mã sách bắt buộc)
- **Chữ số cuối MSSV**: 5
- **Thuế suất VAT**: 10% (5 + 5)%
- **Database**: `DB_23IT265`
- **User Đọc**: `reader_23IT265`
- **User Ghi**: `writer_23IT265`

## Kiến Trúc Hệ Thống
```
[Client Browser]
       │
       ▼
[Render PaaS (Express Server)]
       ├── Session Store ──────────► [MongoDB Atlas: sessions collection (writer)]
       ├── Route GET / (Read) ─────► [MongoDB Atlas: books collection (reader)]
       └── Route POST /books (Write) ─► [MongoDB Atlas: books collection (writer)]
```

## Bảng Phân Quyền Least Privilege (MongoDB Atlas)
| Tài khoản | Collection | Hành động cho phép |
|---|---|---|
| `reader_23IT265` | `books` | `find` (Chỉ đọc) |
| `writer_23IT265` | `books` | `insert` (Chỉ ghi) |
| `writer_23IT265` | `sessions` | `find`, `insert`, `update`, `remove` |

## Hướng Dẫn Chạy Cục Bộ
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Cấu hình biến môi trường:
   Sao chép `.env.example` thành `.env` và điền connection strings:
   ```bash
   cp .env.example .env
   ```
3. Chạy ứng dụng:
   ```bash
   npm run dev
   ```
4. Truy cập: `http://localhost:3000`
