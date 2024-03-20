'use client';
import BoxContainer from '@/components/BoxContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
    return (
        <>
            <BoxContainer>
                <Card className='mx-auto my-10 max-w-lg  p-8'>
                    <CardHeader className='space-y-3'>
                        <CardTitle className='text-center text-2xl'>Please mark your interests!</CardTitle>
                        <CardDescription className='text-center'>We will keep you notified.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <p className='text-black'>My saved interests!</p>
                    </CardContent>
                    <CardFooter className=' '></CardFooter>
                </Card>
            </BoxContainer>
        </>
    );
}
