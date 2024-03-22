import Link from 'next/link';
import React from 'react';

export default function Menu() {
    const navigation = [
        { id: 1, menuItem: 'Categories' },
        { id: 2, menuItem: 'Sale' },
        { id: 1, menuItem: 'Clearance' },
        { id: 1, menuItem: 'New stock' },
        { id: 1, menuItem: 'Trending' },
    ];

    return (
        <div className='absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch'>
            <div className='flex h-12 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0'>
                {navigation.map((category, categoryIdx) => (
                    <div key={categoryIdx} className='flex'>
                        <>
                            <div className='relative flex'>
                                <Link
                                    className='group flex w-full items-center text-nowrap rounded-md border border-transparent px-2 py-1  text-sm font-medium hover:underline'
                                    href='#'>
                                    {category.menuItem}
                                </Link>
                            </div>
                        </>
                    </div>
                ))}
            </div>
        </div>
    );
}
