import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Waitlist from '@/lib/models/Waitlist';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email required' },
                { status: 400 }
            );
        }

        await connectDB();
        await Waitlist.create({ email });

        return NextResponse.json(
            { message: 'Joined waitlist' },
            { status: 201 }
        );
    } catch (err) {
        console.error('WAITLIST ERROR:', err);
        return NextResponse.json(
            { message: err.message || 'Server error' },
            { status: 500 }
        );
    }
}
