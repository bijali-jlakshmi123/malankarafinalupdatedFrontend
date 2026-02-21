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

- **Primary**: `#76297D` (buttons, active states, highlights)
- **Secondary**: `#292B2D` (headings, dark text)
- **Text**: `#334155` (default body text)
- **Accent**: `#C7A754` (accents, specific buttons)
- **Backgrounds**: `#FAF9F5` (BG 1), `#F2F2EC` (BG 2), `#FFFDE4` (BG 3)
- **Button Hover**: `#9B18A7`

## Typography

- **Headings (H1-H6)**: Prata (serif, weight 500)
- **Secondary / Display**: Forum (serif, weight 400)
- **Body Text**: Sarabun (sans-serif, weight 400)
- **Accent Font**: Nunito Sans (sans-serif, weight 500)

## API Endpoints

- `GET /api/hero-slides` - Fetch all hero slides
- `GET /api/navigation-items` - Fetch navigation items
- `GET /api/site-setting` - Fetch site settings

All endpoints support:

- Population of relations (`populate=*`)
- Sorting (`sort=order:asc`)
- Draft and published content filtering
