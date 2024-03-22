'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import FormError from '../ui/form-error';
import { useRouter } from 'next/navigation';
import { getSession, updateSessoin } from '@/lib/auth';

export default function VerificationCard({ email }: { email: string }) {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const verifyOTP = async () => {
        try {
            setError('');
            setIsSubmitting(true);
            const payload = {
                email: email,
                otp: otp,
            };

            const response = await axios.post('/api/verify_otp', payload);
            const responseData = response.data.data;
            console.log(response.data)
            if (response.data.success === true) {
                if (responseData.emailVerified) {
                    await updateSessoin(responseData)

                    router.push('/');
                    router.replace('/');
                    router.refresh();
                } else {
                    setOtp('');
                    toast({
                        duration: 4000,
                        description: response.data.message,
                    });
                }
            } else {
                setOtp('');
                throw new Error(response.data.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {' '}
            <Card className='mx-auto my-10 max-w-xl p-8'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-center text-2xl'>Verify your email</CardTitle>
                    <CardDescription className='text-center'>
                        Enter 8 digit code received on your email <br /> <span className='font-semibold'>{email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='mx-auto grid gap-2'>
                        <Label htmlFor='code'>Code</Label>
                        <InputOTP maxLength={8} value={otp} onChange={setOtp}>
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
                        <FormError message={error} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={otp.length !== 8 || isSubmitting} onClick={verifyOTP} className='mx-auto mt-10 flex w-full'>
                        {isSubmitting ? (
                            <p className={`${isSubmitting ? 'cursor-not-allowed' : ''} flex items-center text-white `}>
                                <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' /> Verifying OTP..
                            </p>
                        ) : (
                            <p className='text-white'> VERIFY</p>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
