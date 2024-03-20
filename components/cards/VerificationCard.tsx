import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';

export default function VerificationCard() {
    return (
        <>
            {' '}
            <Card className='mx-auto my-10 max-w-xl p-8'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-center text-2xl'>Verify your email</CardTitle>
                    <CardDescription className='text-center'>
                        Enter 8 digit code received on your email <br /> <span className='font-semibold'>gagan****.com</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='mx-auto grid gap-2'>
                        <Label htmlFor='code'>Code</Label>
                        <InputOTP maxLength={8}>
                            <InputOTPGroup className='flex justify-center  md:gap-4'>
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={0} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={1} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={2} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={3} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={4} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={5} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={6} />
                                <InputOTPSlot className='rounded-md border border-gray-300 md:h-10 md:w-10' index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled className='mx-auto mt-10 flex w-full'>
                        {' '}
                        <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' />
                        VERIFY
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
