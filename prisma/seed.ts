import 'dotenv/config';
import { prisma } from '../lib/prisma';

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: 'Malankara Palace',
      siteTagline: 'LAKE VIEW RESORT & SPA',
      bookNowUrl: null,
      whatsappNumber: '+917510200444',
      logoUrl:
        'https://malankarapalace.com/wp-content/uploads/2026/01/Malankara-final-logo-scaled.png',
      phoneNumbers: '04862 204400,+91 75102 00444,+91 80862 00404',
    },
    update: {
      siteName: 'Malankara Palace',
      siteTagline: 'LAKE VIEW RESORT & SPA',
      bookNowUrl: null,
      whatsappNumber: '+917510200444',
      logoUrl:
        'https://malankarapalace.com/wp-content/uploads/2026/01/Malankara-final-logo-scaled.png',
      phoneNumbers: '04862 204400,+91 75102 00444,+91 80862 00404',
    },
  });

  await prisma.heroSlide.deleteMany();
  await prisma.navigationItem.deleteMany();

  await prisma.heroSlide.createMany({
    data: [
      {
        title: 'A Tranquil Lakeside Escape at Malankara Palace',
        description:
          'Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.',
        imageUrl: '/images/hero-1.jpg',
        order: 0,
      },
      {
        title: 'Luxury Redefined',
        description:
          'Experience world-class amenities and impeccable service in the heart of nature.',
        imageUrl: '/images/hero-2.jpg',
        order: 1,
      },
    ],
  });

  await prisma.navigationItem.createMany({
    data: [
      { label: 'Home', href: '/', order: 0, isActive: true },
      { label: 'Rooms & Suites', href: '/rooms', order: 1, isActive: false },
      { label: 'Facilities', href: '/facilities', order: 2, isActive: false },
      { label: 'Dining', href: '/dining', order: 3, isActive: false },
      { label: 'Experiences', href: '/experiences', order: 4, isActive: false },
      { label: 'Wedding & Events', href: '/wedding-events', order: 5, isActive: false },
      { label: 'Gallery', href: '/gallery', order: 6, isActive: false },
      { label: 'Our Story', href: '/our-story', order: 7, isActive: false },
      { label: 'Contact Us', href: '/contact', order: 8, isActive: false },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

