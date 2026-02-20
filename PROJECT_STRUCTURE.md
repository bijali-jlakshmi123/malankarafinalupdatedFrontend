# Project Structure

```
malankara-palace/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
│
├── components/                   # React components
│   ├── Header.tsx               # Header with logo and hamburger menu
│   ├── Navigation.tsx           # Off-canvas navigation sidebar
│   └── HeroSlider.tsx           # Hero slider with navigation
│
├── lib/                         # Utilities and API clients
│   ├── api.ts                   # Strapi API integration functions
│   └── types.ts                 # TypeScript type definitions
│
├── public/                      # Static assets
│   └── images/                  # Hero slider images
│
├── strapi/                      # Strapi CMS backend
│   ├── config/                  # Strapi configuration
│   │   ├── admin.ts            # Admin panel config
│   │   ├── api.ts              # API config
│   │   ├── database.ts         # PostgreSQL database config
│   │   ├── middlewares.ts      # Middleware config
│   │   ├── plugins.ts          # Plugin config
│   │   └── server.ts           # Server config
│   │
│   ├── src/
│   │   ├── api/                # API content types
│   │   │   ├── hero-slide/
│   │   │   │   └── content-types/
│   │   │   │       └── hero-slide/
│   │   │   │           └── schema.json
│   │   │   ├── navigation-item/
│   │   │   │   └── content-types/
│   │   │   │       └── navigation-item/
│   │   │   │           └── schema.json
│   │   │   └── site-setting/
│   │   │       └── content-types/
│   │   │           └── site-setting/
│   │   │               └── schema.json
│   │   └── index.ts            # Strapi bootstrap
│   │
│   ├── package.json            # Strapi dependencies
│   └── README.md               # Strapi setup guide
│
├── .env.example                # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── package.json               # Next.js dependencies
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Main project README
├── SETUP.md                   # Detailed setup instructions
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Key Features

### Frontend (Next.js)
- **App Router**: Using Next.js 15 App Router architecture
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Server Components**: Optimized rendering

### Components

1. **Header Component**
   - Logo with "Malankara Palace" branding
   - Hamburger menu toggle
   - "BOOK NOW" button
   - Fixed positioning with backdrop blur

2. **Navigation Component**
   - Off-canvas sidebar (slides from right)
   - Navigation menu items
   - "BOOK NOW" button
   - Contact phone numbers
   - Smooth animations

3. **Hero Slider Component**
   - Image carousel with auto-play
   - Navigation arrows
   - Slide indicators
   - Text overlays
   - Action buttons (Book Now, WhatsApp)
   - Dark overlay for text readability

### Backend (Strapi)

1. **Hero Slide Content Type**
   - Title, description, image
   - Ordering system
   - Optional link

2. **Navigation Item Content Type**
   - Label, href, order
   - Active state tracking

3. **Site Setting Content Type**
   - Logo, phone numbers
   - Site name and tagline
   - Booking and WhatsApp URLs

### Database (PostgreSQL)
- All content stored in PostgreSQL
- Managed through Strapi admin panel
- Relational data support

## Color Scheme

- **Primary Purple**: `#6B46C1` (buttons, active states)
- **WhatsApp Green**: `#25D366` (WhatsApp button)
- **Text**: White on dark backgrounds, Gray-800 on light
- **Background**: White header, dark overlay on hero

## Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## API Endpoints

- `GET /api/hero-slides` - Fetch all hero slides
- `GET /api/navigation-items` - Fetch navigation items
- `GET /api/site-setting` - Fetch site settings

All endpoints support:
- Population of relations (`populate=*`)
- Sorting (`sort=order:asc`)
- Draft and published content filtering
