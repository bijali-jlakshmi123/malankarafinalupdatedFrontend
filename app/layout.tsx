import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malankara Palace - Lake View Resort & Spa",
  description:
    "A tranquil lakeside escape at Malankara Palace. Wake up to calm waters, gentle breezes, and unforgettable moments by Malankara Dam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
