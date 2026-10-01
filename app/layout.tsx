import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'First View Films | Produtora Audiovisual de Alto Padrão - Brasília',
  description: 'Produtora audiovisual boutique especializada em filmes cinematográficos, grandes marcas, casamentos de luxo, arquitetura e documentários.',
  keywords: [
    'produtora audiovisual',
    'cinema brasília',
    'first view films',
    'filmagem 4k',
    'drone fpv',
    'casamentos luxo',
    'denise zuba',
    'byd denza',
    'unicef',
  ],
  openGraph: {
    title: 'First View Films | Produtora Audiovisual de Alto Padrão',
    description: 'Visões extraordinárias transformadas em cinema.',
    url: 'https://firstview.com.br',
    siteName: 'First View Films',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#07080A] text-slate-100 antialiased selection:bg-[#D4AF37] selection:text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
