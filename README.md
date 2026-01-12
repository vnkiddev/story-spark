# Truyện Tranh Cho Bé - Children's PDF Storybook Website

A cute, pink-themed website for children to read PDF storybooks with an admin panel for managing books.

## Features

### Public Features
- 📚 Grid display of all available storybooks
- 🎨 Child-friendly pink theme with cute UI
- 📖 PDF viewer with navigation controls (previous/next page, zoom, fullscreen)
- 📱 Fully responsive design

### Admin Features
- 🔐 Simple login system (admin/hyan2405)
- ➕ Upload new books with title, cover image, and PDF file
- 📋 View all uploaded books with creation dates
- 🗑️ Delete books (removes both files and database records)

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **PDF Viewer**: react-pdf (PDF.js)
- **Authentication**: JWT sessions with cookies
- **File Storage**: Local filesystem

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="hyan2405"

# JWT Secret for session
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# File Upload Settings
MAX_FILE_SIZE_MB=50
UPLOAD_DIR="./uploads"
```

## Usage

### For Readers
1. Visit the homepage to see all available storybooks
2. Click on any book card to start reading
3. Use the navigation controls to browse through pages
4. Use zoom controls to adjust the reading size
5. Click fullscreen for immersive reading experience

### For Admins
1. Go to `/admin` and login with credentials (admin/hyan2405)
2. Upload new books by providing:
   - Book title (required)
   - Cover image (JPG, PNG, WebP)
   - PDF file
3. View and manage existing books in the dashboard
4. Delete books when needed

## File Structure

```
src/
├── app/
│   ├── (admin)/admin/          # Admin routes
│   ├── book/[id]/              # Book reading page
│   ├── api/                    # API endpoints
│   └── globals.css             # Global styles
├── components/                 # React components
├── lib/                        # Utility functions
└── middleware.ts               # Route protection

uploads/                        # File storage
├── covers/                     # Book cover images
└── pdfs/                       # PDF files
```

## Security Notes

- Admin credentials are configurable via environment variables
- File uploads are validated for type and size
- Admin routes are protected by middleware
- Files are served through API routes with proper headers

## Customization

- Modify colors in `tailwind.config.js` for different themes
- Adjust file size limits in `.env.local`
- Update admin credentials in environment variables
- Customize UI text and messages in component files

## Production Deployment

1. Set strong JWT secret in production environment
2. Configure proper file storage (consider cloud storage for production)
3. Set up proper database (PostgreSQL recommended for production)
4. Configure proper CORS and security headers
5. Set up SSL/HTTPS

## License

This project is for personal use. Modify as needed for your requirements.