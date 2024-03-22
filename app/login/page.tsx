'use client';
import BoxContainer from '@/components/BoxContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateSessoin } from '@/lib/auth';
import { toast } from '@/components/ui/use-toast';
import FormError from '@/components/ui/form-error';
import VerificationCard from '@/components/VerificationCard';

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function LoginCard() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async data => {
        try {
            setError('');
            const payload = {
                email: data.email,
                password: data.password,
            };

            const response = await axios.post('/api/login', payload);
            const responseData = response.data.data;
            if (response.data.success === true) {
                if (responseData.emailVerified) {
                    await updateSessoin(responseData);

                    router.push('/');
                    router.replace('/');
                    router.refresh();
                } else {
                    setEmail(responseData.email);
                    setShowOTP(true);
                    toast({
                        duration: 4000,
                        description: ' Please verify OTP sent to your email.',
                    });
                }
            } else {
                setError(response.data.message);
            }
        } catch (error: any) {
            console.log(error.message);
            setError('An error occurred while processing your request');
        }
    };

    return (
        <>
            <BoxContainer>
                {!showOTP && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className='mx-auto my-10 max-w-lg  p-8'>
                            <CardHeader className='space-y-3'>
                                <CardTitle className='text-center text-2xl'>Login</CardTitle>
                                <h4 className='text-center'>Welcome back to ECOMMERCE</h4>
                                <CardDescription className='text-center'>The next gen business marketplace</CardDescription>
                            </CardHeader>
                            <CardContent className='grid gap-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='email'>
                                        Email <span>*</span>
                                    </Label>
                                    <Input id='email' type='email' placeholder='m@example.com' {...register('email')} />
                                    <FormError message={errors.email?.message} />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='password'>
                                        Password <span>*</span>
                                    </Label>
                                    <div className='relative'>
                                        <div
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            className='absolute right-2 top-1 cursor-pointer p-2 text-xs'>
                                            {showPassword == true ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
                                        </div>
                                        <Input id='password' type={showPassword ? 'text' : 'password'} {...register('password')} placeholder='*************' />
                                    </div>
                                    <FormError message={errors.password?.message} />
                                </div>
                                {error && <p className='text-red-500'>{error}</p>}
                            </CardContent>
                            <CardFooter className='flex flex-col items-center justify-center'>
                                <Button disabled={isSubmitting} className='flex w-full'>
                                    {' '}
                                    {isSubmitting ? (
                                        <p className={`${isSubmitting ? 'cursor-not-allowed' : ''} flex items-center text-white `}>
                                            <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' /> Logging in..
                                        </p>
                                    ) : (
                                        <p className='text-white'> LOGIN</p>
                                    )}
                                </Button>
                                <hr className='border-black/6 my-4 w-full' />
                                <p className='text-center'>
                                    Don't have an Account?{' '}
                                    <Link href='/register' className='underline'>
                                        REGISTER
                                    </Link>
                                </p>
                            </CardFooter>
                        </Card>
                    </form>
                )}

                {showOTP && <VerificationCard email={email} />}
            </BoxContainer>
        </>
    );
}
