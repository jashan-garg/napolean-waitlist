'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Home() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    function fireConfetti() {
        const base = {
            particleCount: 18,
            spread: 40,
            startVelocity: 18,
            gravity: 0.25,
            ticks: 160,
            scalar: 0.65,
            origin: { y: 0.55 },
            colors: ['#c8a44b', '#b08a2e', '#f5f5f5'],
        };

        confetti({ ...base, angle: 60 });
        confetti({ ...base, angle: 120 });
    }

    async function submit(e) {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Something went wrong');
                return;
            }

            setSuccess(true);
            fireConfetti();
            setEmail('');
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-[linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.85)),url('/bg-napoleon.png')] bg-cover bg-center bg-fixed text-white">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-130 rounded-[18px] border border-white/10 bg-black/15 backdrop-blur-[1.5px] px-7 py-12 text-center"
            >
                <div className="mb-7 inline-block rounded-full border border-border px-4 py-1 text-xs tracking-[0.3em] text-gold">
                    COMING SOON
                </div>

                <h1 className="mb-4 text-5xl font-bold tracking-wide">
                    Napolean
                </h1>

                <p className="mb-9 text-muted leading-relaxed tracking-[0.01em]">
                    Napoleon captured 70% of Europe, but you can 100% of
                    internet. Join the waitlist for early access.
                </p>

                <AnimatePresence mode="wait">
                    {!success ? (
                        <motion.form
                            key="form"
                            onSubmit={submit}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35 }}
                            className="mb-5 flex flex-col gap-3 sm:flex-row"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 rounded-xl border border-border bg-zinc-950 px-4 py-3 text-sm placeholder-zinc-500 transition-all duration-300 hover:border-zinc-600 focus:border-gold focus:outline-none"
                            />

                            <button
                                disabled={loading}
                                className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#e6c36a] to-[#b08a2e] px-6 py-3 text-sm font-medium text-black transition-all duration-300 ease-out hover:brightness-110 active:translate-y-px disabled:opacity-60"
                            >
                                {loading ? 'Joining…' : 'Join Waitlist'}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="mb-6 rounded-xl border border-gold/30 bg-gold/10 px-6 py-5"
                        >
                            <p className="font-medium text-gold">You’re in.</p>
                            <p className="mt-1 text-sm text-muted">
                                Early access coming soon.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8">
                    <div className="text-xs text-zinc-500">
                        No spam. No nonsense. Early access only.
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="mt-6 text-center"
                    >
                        <a
                            href="https://wa.me/917087159779?text=Hi%20I%20just%20joined%20the%20Napolean%20waitlist."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
            group inline-flex items-center gap-3
            rounded-full
            border border-gold/40
            bg-transparent
            px-6 py-3
            text-sm font-medium tracking-wide text-gold
            transition-all duration-300 ease-out
            hover:bg-[#25D366]
            hover:border-[#25D366]
            hover:text-white
            hover:-translate-y-px
            hover:shadow-lg
        "
                        >
                            <svg
                                className="h-5 w-5 fill-current text-gold transition-colors duration-300 group-hover:text-white"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>

                            <span>Message the CEO</span>
                        </a>
                    </motion.div>

                    <footer className="text-xs text-zinc-600">
                        © 2026 Napolean. All rights reserved.
                    </footer>
                </div>
            </motion.div>
        </main>
    );
}
