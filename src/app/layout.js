import './globals.css';
import { Libre_Baskerville } from 'next/font/google';

const baskerville = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-baskerville',
});

export const metadata = {
    title: 'Napolean — Waitlist',
    description: 'Napolean is coming soon. Join the waitlist for early access.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={baskerville.variable}>{children}</body>
        </html>
    );
}
