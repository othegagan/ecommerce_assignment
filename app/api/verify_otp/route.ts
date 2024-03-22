import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        // Check if user exists with the provided email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // If user doesn't exist, return an error
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found.',
                    data: null,
                },
                { status: 404 },
            );
        }

        // Compare the received OTP with the OTP stored in the database
        if (user.otp !== otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                    data: null,
                },
                { status: 200 },
            );
        }

        // Update user's emailVerified status to true
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerified: true,
            },
        });

        // Return success response with user details
        return NextResponse.json(
            {
                success: true,
                message: 'OTP verification successful. Email verified.',
                data: {
                    id : updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    emailVerified: updatedUser.emailVerified,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
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
