import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testId = params.id;

    try {
        // Fetch the test details from the database using Prisma
        const testDetails = await db.test.findUnique({
            where: { id: testId },
        });

        if (!testDetails) {
            return NextResponse.json({ error: 'Test not found' }, { status: 404 });
        }

        return NextResponse.json(testDetails, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch test details' }, { status: 500 });
    }
}