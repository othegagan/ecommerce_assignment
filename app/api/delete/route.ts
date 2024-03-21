import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
    try {
        // Delete all users
        await prisma.user.deleteMany();

        return NextResponse.json(
            {
                success: true,
                message: 'All users deleted successfully',
                data: null,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete users',
                data: null,
            },
            { status: 500 },
        );
    }
}
