import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, LoaderCircle } from 'lucide-react';

export default function CreateAccountCard() {
    return (
        <div>
            <Card className='mx-auto my-10 max-w-lg p-8'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl text-center'>Create an account</CardTitle>
                    <CardDescription className='text-center'>Enter your email below to create your account</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input id='name' type='text' placeholder='Enter your name' />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' placeholder='m@example.com' />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' type='password' placeholder='*************' />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled className='flex w-full'>
                        {' '}
                        <LoaderCircle className='w-5-4 mr-2 w-4 animate-spin  ease-in' />
                        Create account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
