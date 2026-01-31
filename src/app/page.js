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
                        
                    </motion.div>

                    <footer className="text-xs text-zinc-600">
                        © 2026 Napolean. All rights reserved.
                    </footer>
                </div>
            </motion.div>
        </main>
    );
}
