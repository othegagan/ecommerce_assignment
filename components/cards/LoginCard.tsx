'use client';
import BoxContainer from '@/components/BoxContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <BoxContainer>
                <Card className='mx-auto my-10 max-w-lg  p-8'>
                    <CardHeader className='space-y-3'>
                        <CardTitle className='text-center text-2xl'>Login</CardTitle>
                        <h4 className='text-center'>Welcome back to ECOMMERCE</h4>
                        <CardDescription className='text-center'>The next gen business marketplace</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' type='email' placeholder='m@example.com' />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Password</Label>
                            <div className='relative'>
                                <div
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    className='absolute right-2 top-1 cursor-pointer p-2 text-xs'>
                                    {showPassword == true ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
                                </div>
                                <Input id='password' type='password' placeholder='*************' />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col items-center justify-center'>
                        <Button disabled className='flex w-full'>
                            {' '}
                            <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' />
                            Login
                        </Button>
                        <hr className='border-black/6 my-4 w-full' />
                        <p className='text-center'>
                            Don't have an Account?{' '}
                            <Link href='/signup' className='hover:underline'>
                                SIGN UP
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </BoxContainer>
        </>
    );
}
