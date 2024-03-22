'use client';
import React from 'react';
import BoxContainer from '@/components/BoxContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/data-table';
import { columns } from '@/components/columns';
import { useCategories } from '@/hooks/useCategories';
import { CardSkeleton } from '@/components/ui/skeletons/skeletons';

export default function Categories() {
    const { loading, error, categories } = useCategories();


    const countWishlisted = categories.reduce((count: number, item: { isWishlisted: boolean }) => {
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
                        {loading && <CardSkeleton />}
                        {!loading && !error && (
                            <>
                                <p className='text-black'>Total {countWishlisted} saved interests found..!</p>

                                <DataTable data={categories} columns={columns} />
                            </>
                        )}
                        {error && <h4>Something went wrong fetching data..</h4>}
                    </CardContent>
                </Card>
            </BoxContainer>
        </>
    );
}
