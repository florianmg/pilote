import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Pilote',
  description: 'Pilotez vos projets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
