#!/bin/bash

echo "Đang kiểm tra kết nối tới MockAPI..."
echo "Endpoint: https://64de102a825d19d9bfb1f7ba.mockapi.io/api/v1"

echo ""
echo "1. Kiểm tra endpoint transactions:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/api/v1/transactions" | head -20

echo ""
echo "2. Kiểm tra endpoint users:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/api/v1/users" | head -20

echo ""
echo "3. Tạo một giao dịch mẫu:"
curl -X POST -H "Content-Type: application/json" \
  -d '{"userId":"1","type":"income","amount":1000,"description":"Test transaction","date":"2024-01-01","currency":"VND"}' \
  -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/api/v1/transactions"

echo ""
echo "4. Kiểm tra lại danh sách giao dịch sau khi thêm:"
curl -s -w "\nHTTP Status: %{http_code}\n" "https://64de102a825d19d9bfb1f7ba.mockapi.io/api/v1/transactions" | head -20