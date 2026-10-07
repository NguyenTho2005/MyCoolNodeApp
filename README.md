# Ứng Dụng Quản Lý Sách (Cloud Computing Midterm)

## 1. Thông Tin Sinh Viên
* **Họ và tên**: Nguyễn Xuân Thọ
* **Mã số sinh viên (MSSV)**: `23IT265`
* **3 số cuối MSSV (Tiền tố mã sách bắt buộc)**: `265` (Ví dụ hợp lệ: `265001`, `265-BK1`)
* **Chữ số cuối MSSV**: `5`
* **Thuế suất VAT tính động**: `VAT = (5 + 5)% = 10%`
* **Database trên Atlas**: `DB_23IT265`
* **Tài khoản chỉ đọc**: `reader_23IT265`
* **Tài khoản ghi**: `writer_23IT265`

---

## 2. Sơ Đồ Kiến Trúc Hệ Thống (Stateless & Cloud Database)

```
[Trình duyệt Người dùng]
       │
       ▼ (HTTPS)
[Render PaaS - Web Service (Node.js/Express)]
       │
       ├──► Lưu trữ phiên tập trung (Stateless):
       │    express-session + connect-mongo ──► [MongoDB Atlas: DB_23IT265 / sessions] (Tài khoản writer_23IT265)
       │
       ├──► Luồng ĐỌC (GET /):
       │    BookRead model (Mongoose Conn 1) ──► [MongoDB Atlas: DB_23IT265 / books] (Tài khoản reader_23IT265)
       │
       └──► Luồng GHI (POST /books):
            BookWrite model (Mongoose Conn 2) ──► [MongoDB Atlas: DB_23IT265 / books] (Tài khoản writer_23IT265)
```

---

## 3. Kiến Trúc Bảo Mật Cơ Sở Dữ Liệu Cloud (Least Privilege)

Áp dụng nguyên tắc đặc quyền tối thiểu, không dùng tài khoản root / admin cho ứng dụng:

| Tài khoản | Collection | Hành động được cấp phép | Mục đích sử dụng |
|---|---|---|---|
| `reader_23IT265` | `books` | `find` (Chỉ đọc) | Phục vụ tính năng hiển thị danh sách sách |
| `writer_23IT265` | `books` | `insert` (Chỉ ghi) | Phục vụ tính năng thêm mới sách sau khi kiểm tra tiền tố mã |
| `writer_23IT265` | `sessions` | `find`, `insert`, `update`, `remove` | Quản lý phiên làm việc tập trung (Stateless Session) |

---

## 4. Sơ Đồ Cây Git (DevOps Branches & Merge Nodes)

Dự án được bóc tách trên 02 nhánh tính năng riêng biệt và gộp về `main` bằng cờ `--no-ff` để lưu đầy đủ lịch sử các nút gộp (Merge Node):

```
* 27e3833 (HEAD -> main) feat: wire up app.js (session, routes, handlebars)
*   64616e6 Merge branch 'feature/session' into main
|\  
| * 5159c12 (feature/session) feat(session): store sessions in MongoDB Atlas via connect-mongo (stateless)
* |   2687be4 Merge branch 'feature/database' into main
|\ \  
| |/  
|/|   
| * 347b69b (feature/database) feat(db): dual connections (read/write), Book model, code filter and VAT calculation
|/  
* 2e2d661 chore: init project scaffold, gitignore, views
```

---

## 5. Hướng Dẫn Chạy Cục Bộ (Local Testing)

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```
2. **Cấu hình môi trường (`.env`):**
   ```bash
   cp .env.example .env
   ```
   Điền thông tin connection strings từ MongoDB Atlas vào `.env`:
   ```env
   STUDENT_ID=23IT265
   STUDENT_NAME=Nguyễn Xuân Thọ
   MONGO_URI_READ=mongodb+srv://reader_23IT265:<password>@<cluster>.mongodb.net/DB_23IT265?retryWrites=true&w=majority
   MONGO_URI_WRITE=mongodb+srv://writer_23IT265:<password>@<cluster>.mongodb.net/DB_23IT265?retryWrites=true&w=majority
   SESSION_SECRET=super_secret_key_cloud_midterm_23IT265
   NODE_ENV=development
   PORT=3000
   ```
3. **Khởi chạy máy chủ:**
   ```bash
   npm run dev
   # hoặc
   npm start
   ```
4. **Kiểm tra chức năng:**
   - Mở trình duyệt tại `http://localhost:3000`.
   - Footer hiển thị đúng: **Họ tên: Nguyễn Xuân Thọ | MSSV: 23IT265 | VAT áp dụng: 10%**.
   - Thêm sách có mã bắt đầu bằng `265` (VD: `265001`) $\rightarrow$ Thành công, giá sau thuế tính tự động $= \text{giá gốc} \times 1.1$.
   - Thêm sách có mã không bắt đầu bằng `265` (VD: `999001`) $\rightarrow$ Bị từ chối (HTTP 400).

---

## 6. Triển Khai Trên Nền Tảng Cloud (Render PaaS)

1. Đẩy mã nguồn lên GitHub Repo ở chế độ **Private**.
2. Thêm Giảng viên vào mục **Collaborators** trên GitHub.
3. Tạo **Web Service** trên Render kết nối với GitHub Repo.
4. Cấu hình các biến môi trường (**Environment Variables**) trên Dashboard của Render:
   - `STUDENT_ID`: `23IT265`
   - `STUDENT_NAME`: `Nguyễn Xuân Thọ`
   - `MONGO_URI_READ`: Chuỗi kết nối của user reader
   - `MONGO_URI_WRITE`: Chuỗi kết nối của user writer
   - `SESSION_SECRET`: Chuỗi bảo mật phiên
   - `NODE_ENV`: `production`
5. Đường dẫn endpoint sức khỏe: `https://<ten-app>.onrender.com/health` (dùng cho dịch vụ ping định kỳ giữ máy chủ hoạt động 24/7).
