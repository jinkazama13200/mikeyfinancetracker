# Hướng dẫn thiết lập MockAPI

Để ứng dụng có thể hoạt động với MockAPI, bạn cần tạo các resource trong MockAPI theo các bước sau:

## 1. Truy cập MockAPI
- Truy cập: https://mockapi.io/
- Đăng ký tài khoản nếu chưa có

## 2. Tạo endpoint mới
- Sử dụng endpoint: `https://64de102a825d19d9bfb1f7ba.mockapi.io`
- Tên mô tả: `MyFinanceTracker API`

## 3. Tạo các resource

### Resource: transactions
- Tên resource: `transactions`
- Fields:
  - `userId` (string) - ID của người dùng
  - `type` (string) - 'income' hoặc 'expense'
  - `amount` (number) - Số tiền
  - `description` (string) - Mô tả giao dịch
  - `date` (string) - Ngày giao dịch (YYYY-MM-DD)
  - `currency` (string) - Loại tiền tệ (mặc định 'VND')

### Resource: users
- Tên resource: `users`
- Fields:
  - `username` (string) - Tên đăng nhập
  - `email` (string) - Email
  - `password` (string) - Mật khẩu (đã mã hóa)
  - `createdAt` (string) - Ngày tạo

## 4. Sau khi tạo xong
- MockAPI sẽ tự động tạo các endpoint:
  - GET /transactions - Lấy tất cả giao dịch
  - POST /transactions - Tạo giao dịch mới
  - GET /transactions/{id} - Lấy giao dịch theo ID
  - PUT /transactions/{id} - Cập nhật giao dịch
  - DELETE /transactions/{id} - Xóa giao dịch
  - GET /users - Lấy tất cả người dùng
  - POST /users - Tạo người dùng mới
  - GET /users/{id} - Lấy người dùng theo ID
  - PUT /users/{id} - Cập nhật người dùng
  - DELETE /users/{id} - Xóa người dùng

## 5. Kiểm tra
Bạn có thể kiểm tra lại bằng công cụ của MockAPI hoặc bằng curl:
```bash
curl https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions
```

Sau khi hoàn thành các bước trên, ứng dụng sẽ có thể giao tiếp với MockAPI để lưu trữ dữ liệu giao dịch.