export interface BankAccount {
  id: string;
  name: string; // Tên tài khoản ví dụ: "Vietcombank", "Techcombank", "Momo", v.v.
  accountNumber: string; // Số tài khoản
  balance: number; // Số dư hiện tại
  currency: string; // Loại tiền tệ
  bankCode?: string; // Mã ngân hàng nếu có
  bankLogo?: string; // Đường dẫn logo ngân hàng
  isActive: boolean; // Trạng thái tài khoản
  userId: string; // ID người dùng sở hữu
  createdAt: string; // Ngày tạo
  updatedAt: string; // Ngày cập nhật
}