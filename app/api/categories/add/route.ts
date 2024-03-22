import prisma from '@/lib/db';
import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {

        const categories = [];

        // Generate 100 categories using Faker
        for (let i = 0; i < 100; i++) {
            const category = {
                name: faker.commerce.department(),
            };
            categories.push(category);
        }

        // Insert categories into the database
        await prisma.category.createMany({
            data: categories,
            skipDuplicates: true,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Categories created and inserted successfully',
                data: null,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create and insert categories',
                data: null,
            },
            { status: 500 },
        );
    }
}
