# Malankara Palace Website

A luxury resort website built with Next.js, PostgreSQL, and Strapi CMS.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **CMS**: Strapi 4
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Set up Strapi (see strapi/README.md)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and API clients
├── public/          # Static assets
└── strapi/          # Strapi CMS backend
```
