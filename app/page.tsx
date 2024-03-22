import React from 'react';
import BoxContainer from '@/components/BoxContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/data-table';
import { columns } from '@/components/columns';
import { getCategories } from './actions/getData';
import { getSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default async function Categories() {
    const session = await getSession();
    const router = useRouter();
    if (!session.isLoggedIn) {
        router.replace('/login');
        router.refresh();
    }

    const response = await getCategories();
    if (!response.success) {
        return <p>Error getting data</p>;
    }

    const countWishlisted = response.data.reduce((count: number, item: { isWishlisted: boolean }) => {
        if (item.isWishlisted) {
            count++;
        }
        return count;
    }, 0);
    return (
        <>
            <BoxContainer>
                <Card className='mx-auto my-10 max-w-lg  p-8'>
                    <CardHeader className='space-y-3'>
                        <CardTitle className='text-center text-2xl'>Please mark your interests!</CardTitle>
                        <CardDescription className='text-center'>We will keep you notified.</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <p className='text-black'>Total {countWishlisted} saved interests found..!</p>
                        <span></span>
                        <DataTable data={response.data} columns={columns} />
                    </CardContent>
                </Card>
            </BoxContainer>
        </>
    );
}
