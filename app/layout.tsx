import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Navbar from '@/components/navigation/NavBar';
import Banner from '@/components/advertisement/Banner';
import SmallerMenu from '@/components/navigation/SmallerMenu';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Fly Buy',
    description: 'Fly Buy is a platform for buying and selling products online. It provides a seamless and secure shopping experience for users.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <Banner />
                    <div className='min-w-[360px] flex  flex-col bg-background'>{children}</div>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
