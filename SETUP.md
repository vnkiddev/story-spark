# Hướng dẫn cài đặt và chạy ứng dụng

## Bước 1: Cài đặt dependencies

```bash
npm install
```

## Bước 2: Thiết lập database

```bash
# Tạo Prisma client
npx prisma generate

# Tạo database và tables
npx prisma db push
```

## Bước 3: Tạo thư mục uploads

```bash
mkdir -p uploads/covers uploads/pdfs
```

## Bước 4: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Thông tin đăng nhập Admin

- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `hyan2405`

## Cấu trúc thư mục sau khi cài đặt

```
children-storybook/
├── src/                    # Source code
├── prisma/                 # Database schema
├── uploads/                # File storage
│   ├── covers/            # Book covers
│   └── pdfs/              # PDF files
├── .env.local             # Environment variables
└── package.json           # Dependencies
```

## Lưu ý

1. Đảm bảo Node.js version >= 18
2. File `.env.local` đã được tạo với các biến môi trường cần thiết
3. Thư mục `uploads` cần có quyền ghi
4. Để thay đổi thông tin đăng nhập admin, sửa file `.env.local`

## Troubleshooting

### Lỗi database
```bash
# Xóa database và tạo lại
rm prisma/dev.db
npx prisma db push
```

### Lỗi PDF viewer
- Đảm bảo file PDF hợp lệ
- Kiểm tra kết nối internet (cần tải PDF.js worker)

### Lỗi upload file
- Kiểm tra quyền ghi thư mục `uploads`
- Kiểm tra kích thước file (mặc định max 50MB)