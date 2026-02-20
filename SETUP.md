# Malankara Palace Website - Setup Guide

This guide will help you set up the complete Malankara Palace website with Next.js, PostgreSQL, and Strapi CMS.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **PostgreSQL** 14.x or higher
- **npm** or **yarn** package manager
- **Git** (optional)

## Step 1: Database Setup

1. **Create PostgreSQL Database:**
   ```sql
   CREATE DATABASE malankara_palace;
   ```

2. **Note your database credentials:**
   - Host: `localhost` (or your PostgreSQL host)
   - Port: `5432` (default)
   - Database: `malankara_palace`
   - Username: Your PostgreSQL username
   - Password: Your PostgreSQL password

## Step 2: Environment Configuration

1. **Copy environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Generate Strapi secrets** (run these commands and add to `.env.local`):
   ```bash
   # Generate APP_KEYS (run this 4 times, add all 4 values separated by commas)
   openssl rand -base64 32
   
   # Generate API_TOKEN_SALT
   openssl rand -base64 32
   
   # Generate ADMIN_JWT_SECRET
   openssl rand -base64 32
   
   # Generate TRANSFER_TOKEN_SALT
   openssl rand -base64 32
   
   # Generate JWT_SECRET
   openssl rand -base64 32
   ```

3. **Update `.env.local`** with your database credentials:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=malankara_palace
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   ```

## Step 3: Install Dependencies

1. **Install Next.js dependencies:**
   ```bash
   npm install
   ```

2. **Install Strapi dependencies:**
   ```bash
   cd strapi
   npm install
   cd ..
   ```

## Step 4: Start Strapi CMS

1. **Start Strapi development server:**
   ```bash
   cd strapi
   npm run develop
   ```

2. **Create admin user:**
   - Open `http://localhost:1337/admin`
   - Fill in the registration form to create your admin account

3. **Configure API permissions:**
   - Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
   - Enable the following permissions:
     - **Hero Slide**: `find`, `findOne`
     - **Navigation Item**: `find`, `findOne`
     - **Site Setting**: `find`, `findOne`

## Step 5: Add Content in Strapi

### Add Hero Slides

1. Go to **Content Manager** → **Hero Slide** → **Create new entry**
2. Add the following fields:
   - **Title**: "A Tranquil Lakeside Escape at Malankara Palace"
   - **Description**: "Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam."
   - **Image**: Upload your hero image
   - **Order**: 0
3. Click **Save** and **Publish**
4. Repeat for additional slides

### Add Navigation Items

1. Go to **Content Manager** → **Navigation Item** → **Create new entry**
2. Add navigation items:
   - Home (href: `/`, order: 0, isActive: true)
   - Rooms & Suites (href: `/rooms`, order: 1)
   - Facilities (href: `/facilities`, order: 2)
   - Dining (href: `/dining`, order: 3)
   - Experiences (href: `/experiences`, order: 4)
   - Wedding & Events (href: `/wedding-events`, order: 5)
   - Gallery (href: `/gallery`, order: 6)
   - Our Story (href: `/our-story`, order: 7)
   - Contact Us (href: `/contact`, order: 8)
3. Click **Save** and **Publish** for each item

### Configure Site Settings

1. Go to **Content Manager** → **Site Setting** → **Create new entry**
2. Add the following:
   - **Site Name**: "Malankara Palace"
   - **Site Tagline**: "LAKE VIEW RESORT & SPA"
   - **Phone Numbers**: `["04862 204400", "+91 75102 00444", "+91 80862 00404"]`
   - **WhatsApp Number**: "+917510200444"
   - **Book Now URL**: (your booking URL)
   - **Logo**: (optional, upload logo image)
3. Click **Save** and **Publish**

## Step 6: Add Hero Images

1. Place your hero slider images in the `public/images/` directory:
   - `hero-1.jpg`
   - `hero-2.jpg`
   - (add more as needed)

2. Or upload them through Strapi's media library and use the URLs in your Hero Slide entries.

## Step 7: Start Next.js Development Server

1. **In a new terminal**, start the Next.js server:
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Website: `http://localhost:3000`
   - Strapi Admin: `http://localhost:1337/admin`

## Step 8: Verify Everything Works

1. ✅ Check that the header displays correctly with logo
2. ✅ Click the hamburger menu - sidebar should slide in from right
3. ✅ Verify navigation items appear correctly
4. ✅ Check hero slider displays images and text
5. ✅ Test slider navigation arrows
6. ✅ Verify "Book Now" and "WhatsApp" buttons are visible
7. ✅ Check phone numbers display in navigation sidebar

## Troubleshooting

### Strapi won't start
- Check PostgreSQL is running
- Verify database credentials in `.env.local`
- Ensure database `malankara_palace` exists

### Images not loading
- Check image paths in `public/images/`
- Verify Strapi media URLs are correct
- Check `next.config.js` image domain configuration

### API errors
- Ensure Strapi is running on port 1337
- Check API permissions in Strapi admin
- Verify `NEXT_PUBLIC_STRAPI_URL` in `.env.local`

### Build errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check TypeScript errors: `npm run lint`

## Production Deployment

### Build Next.js:
```bash
npm run build
npm start
```

### Build Strapi:
```bash
cd strapi
npm run build
npm start
```

Remember to update environment variables for production!

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
