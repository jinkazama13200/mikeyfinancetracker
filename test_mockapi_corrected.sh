#!/bin/bash

echo "Đang kiểm tra kết nối tới MockAPI..."
echo "Endpoint: https://64de102a825d19d9bfb1f7ba.mockapi.io"

echo ""
echo "1. Kiểm tra endpoint transactions:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions"

echo ""
echo "2. Kiểm tra endpoint có dấu gạch chéo:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions/"

echo ""
echo "3. Nếu có dữ liệu, sẽ hiển thị ở trên. Bây giờ thử tạo một giao dịch mẫu:"

sample_data='{"userId":"1","type":"income","amount":1000,"description":"Test transaction","date":"2024-01-01","currency":"VND"}'
echo "Dữ liệu mẫu: $sample_data"

curl -X POST -H "Content-Type: application/json" \
  -d "$sample_data" \
  -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions"

echo ""
echo "4. Kiểm tra lại danh sách giao dịch sau khi thêm:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions" | head -30