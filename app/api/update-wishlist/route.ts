import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId, categoryId, action } = await req.json();

        if (!userId || !categoryId || !action) {
            throw new Error('Missing required parameters');
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        // Add or remove category from user's wishlist based on action
        if (action === 'add') {
            await prisma.wishlistItem.create({
                data: {
                    userId: userId,
                    categoryId: categoryId,
                },
            });
        } else if (action === 'remove') {
            await prisma.wishlistItem.deleteMany({
                where: {
                    userId: userId,
                    categoryId: categoryId,
                },
            });
        } else {
            throw new Error('Invalid action. Supported actions: add, remove');
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Wishlist updated successfully',
                data: null,
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                data: null,
            },
            { status: 400 },
        );
    }
}
