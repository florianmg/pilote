import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Pilote',
  description: 'Pilote app help you manage your projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
