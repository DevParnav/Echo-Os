import React from 'react';
import './globals.css';
import '../styles/components.css';

export const metadata = {
  title: 'EchoOS — Personal Cognitive Operating System',
  description: 'EchoOS remembers your decisions, understands your thinking, and helps future-you make better choices using local AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
