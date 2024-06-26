import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found. Please register.',
                    data: null,
                },
                { status: 404 },
            );
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Incorrect password. Please try again.',
                    data: null,
                },
                { status: 401 },
            );
        }

        // Return success response with user data
        return NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                data: {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    emailVerified: existingUser.emailVerified,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: 'Something went wrong!',
                data: null,
            },
            { status: 500 },
        );
    }
}
