import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // If user with the provided email already exists, return an error
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email already exists. Please Login',
                    data: null,
                },
                { status: 400 },
            ); // Bad Request status code
        }

        // Generate 8-digit OTP
        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt round of 10

        // Create user with hashed password and generated OTP
        const newUser = await prisma.user.create({
            data: {
                id: undefined,
                email: email,
                name: name,
                password: hashedPassword,
                emailVerified: false,
                otp: otp,
            },
        });

        

        // Return response with success status, message, and user data
        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully',
                data: {
                    email: newUser.email,
                    otp: newUser.otp,
                    name: newUser.name,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        // Return response with error status and message
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
