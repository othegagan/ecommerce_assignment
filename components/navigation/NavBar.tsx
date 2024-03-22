import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import BoxContainer from '../BoxContainer';
import { Button } from '../ui/button';
import SmallerMenu from './SmallerMenu';

const navigation = [
    { id: 1, menuItem: 'Categories' },
    { id: 2, menuItem: 'Sale' },
    { id: 1, menuItem: 'Clearance' },
    { id: 1, menuItem: 'New stock' },
    { id: 1, menuItem: 'Trending' },
];

export default function Navbar() {
    return (
        <>
            <SmallerMenu />
            <header className='relative '>
                <BoxContainer>
                    <nav aria-label='Top'>
                        <div className=' pb-14 sm:px-0 sm:pb-0'>
                            <div className='flex h-16 items-center justify-between'>
                                {/* Logo */}
                                <div className='flex flex-1'>
                                    <a href='#'>
                                        <span className='sr-only'>Your Company</span>
                                        <h4 className='uppercase font-extrabold'>ecommerce </h4>
                                    </a>
                                </div>

                                {/*  menus */}
                                <div className='absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch'>
                                    <div className='flex h-12 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0'>
                                        {navigation.map((category, categoryIdx) => (
                                            <div key={categoryIdx} className='flex'>
                                                <>
                                                    <div className='relative flex'>
                                                        <Link
                                                            className='group flex w-full items-center text-nowrap rounded-md border border-transparent px-2 py-1  text-sm font-medium hover:underline'
                                                            target=''
                                                            rel=''
                                                            href='/docs/components/drawer'>
                                                            {category.menuItem}
                                                        </Link>
                                                    </div>
                                                </>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-1 items-center justify-end'>
                                    {/* Search */}
                                    <Button variant='ghost' size='icon'>
                                        {' '}
                                        <Search className='h-6 w-6' />
                                    </Button>

                                    {/* Cart */}
                                    <div className='mx-4 flow-root lg:ml-8'>
                                        <Button variant='ghost' size='icon'>
                                            <ShoppingCart className='h-6 w-6 flex-shrink-0 ' />

                                            {/* <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>0</span> */}
                                            <span className='sr-only'>items in cart, view bag</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </BoxContainer>
            </header>
        </>
    );
}
