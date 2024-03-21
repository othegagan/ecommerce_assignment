import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            throw new Error('User ID is not provided');
        }
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User does not exist in the database');
        }

        // Fetch all categories from the database
        const categories = await prisma.category.findMany();

        // Fetch wishlist items for the specific user
        const wishlistItems = await prisma.wishlistItem.findMany({
            where: {
                userId: userId, // Filter wishlist items by user ID
            },
            select: {
                categoryId: true, // Select only the categoryId field
            },
        });

        // Convert wishlist items to a Set for efficient lookup
        const wishlistItemSet = new Set(wishlistItems.map(item => item.categoryId));

        // Map through categories and add isWishlisted flag based on whether the category is wishlisted by the user
        const categoriesWithFlags = categories.map(category => ({
            ...category,
            isWishlisted: wishlistItemSet.has(category.id),
        }));

        return NextResponse.json(
            {
                success: true,
                message: 'Categories retrieved successfully',
                data: categoriesWithFlags,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to retrieve categories',
                data: null,
            },
            { status: 500 },
        );
    }
}
