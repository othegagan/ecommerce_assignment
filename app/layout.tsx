import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Navbar from '@/components/navigation/NavBar';
import Banner from '@/components/advertisement/Banner';
import SmallerMenu from '@/components/navigation/SmallerMenu';
import { Toaster } from '@/components/ui/toaster';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ecommerce | Gagan Kumar',
    description: 'Ecommerce is a platform for buying and selling products online. It provides a seamless and secure shopping experience for users.',
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
                    <div className='flex min-w-[360px]  flex-col bg-background'>{children}</div>

                    <div className='fixed right-20 scale-125'>
                        <ThemeToggle />
                    </div>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
