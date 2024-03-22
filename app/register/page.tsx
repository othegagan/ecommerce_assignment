'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

import emailjs from 'emailjs-com';
import Link from 'next/link';
import FormError from '@/components/ui/form-error';
import VerificationCard from '@/components/VerificationCard';

const schema = z.object({
    name: z.string().trim().min(3, 'Name must be atleast 3 chars.'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be atleast 8 chars'),
});

type FormFields = z.infer<typeof schema>;

export default function Register() {
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
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
            };

            const response = await axios.post('/api/register', payload);
            const responseData = response.data;
            if (response.data.success === true) {
                // Send email using emailjs
                const result = emailjs.init('7y79Ogsbb_0RaiaY9');
                const emailResponse = await emailjs.send('service_kccp5tl', 'template_88r4cjf', {
                    to_name: responseData.data.name,
                    otp_code: responseData.data.otp,
                    to_email: responseData.data.email,
                });

                if (emailResponse.status === 200) {
                    setEmail(data.email);
                    setShowOTP(true);
                }
            } else {
                setError(response.data.message);
            }
        } catch (error: any) {
            console.log(error.response.data.message);
            setError(error.response.data.message || 'An error occurred while processing your request');
        }
    };

    return (
        <div>
            {!showOTP && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className='mx-auto my-10 max-w-lg p-8'>
                        <CardHeader className='space-y-1'>
                            <CardTitle className='text-center text-2xl'>Create an account</CardTitle>
                            <CardDescription className='text-center'>Enter your email below to create your account</CardDescription>
                        </CardHeader>
                        <CardContent className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='name'>
                                    Name <span>*</span>
                                </Label>
                                <Input id='name' type='text' placeholder='Enter your name' {...register('name')} />
                                <FormError message={errors.name?.message} />
                            </div>
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
                        <CardFooter className='flex flex-col'>
                            <Button disabled={isSubmitting} className='flex w-full'>
                                {' '}
                                {isSubmitting ? (
                                    <div className={`${isSubmitting ? 'cursor-not-allowed' : ''} flex items-center  `}>
                                        <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' />
                                    </div>
                                ) : (
                                    < > REGISTER</>
                                )}
                            </Button>
                            <hr className='border-black/6 my-4 w-full' />
                            <p className='text-center'>
                                Already have an Account?{' '}
                                <Link href='/login' className='underline'>
                                    LOGIN
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            )}
            {showOTP && <VerificationCard email={email} />}
        </div>
    );
}
